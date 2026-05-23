const Employee = require('../models/Employee');
const User = require('../models/User');

/**
 * @desc    Get all employees with pagination, search, and filters
 * @route   GET /api/employees
 * @access  Private
 */
exports.getEmployees = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      department = '',
      status = '',
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    // Build query
    let query = {};

    // Text search on name and email
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by department
    if (department) {
      query.department = department;
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // If user is an employee, only show their own data
    if (req.user.role === 'employee') {
      query._id = req.user.employeeId;
    }

    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Sort order
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute query
    const employees = await Employee.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    // Get total count
    const total = await Employee.countDocuments(query);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limitNum);

    res.status(200).json({
      success: true,
      data: {
        employees,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalItems: total,
          itemsPerPage: limitNum,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single employee by ID
 * @route   GET /api/employees/:id
 * @access  Private
 */
exports.getEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .populate('userId', 'name email role');

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    // If user is employee, only allow access to their own data
    if (req.user.role === 'employee' && employee._id.toString() !== req.user.employeeId?.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this employee data',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        employee,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new employee
 * @route   POST /api/employees
 * @access  Private (Admin/Manager only)
 */
exports.createEmployee = async (req, res, next) => {
  try {
    // Add created by user
    req.body.createdBy = req.user._id;

    // Create employee first
    const employee = await Employee.create(req.body);

    // Generate username and email for login
    const username = req.body.firstName.toLowerCase();
    const loginEmail = `${username}@roletrack.com`;
    
    // Default password (can be customized)
    const defaultPassword = 'roletrack123';

    // Check if user with this email already exists
    const existingUser = await User.findOne({ email: loginEmail });
    
    let user;
    if (!existingUser) {
      // Create User account for this employee
      user = await User.create({
        name: `${req.body.firstName} ${req.body.lastName}`,
        email: loginEmail,
        password: defaultPassword,
        role: 'employee',
        employeeId: employee._id,
        status: req.body.status || 'active',
      });

      // Link user to employee
      employee.userId = user._id;
      await employee.save();
    } else {
      // Link to existing user
      employee.userId = existingUser._id;
      existingUser.employeeId = employee._id;
      await existingUser.save();
      await employee.save();
      user = existingUser;
    }

    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: {
        employee,
        loginCredentials: {
          email: loginEmail,
          password: defaultPassword,
          message: 'Please share these credentials with the employee',
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update employee
 * @route   PUT /api/employees/:id
 * @access  Private (Admin/Manager only)
 */
exports.updateEmployee = async (req, res, next) => {
  try {
    let employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    // Add updated by user
    req.body.updatedBy = req.user._id;

    // Update employee
    employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    // If status changed, update the corresponding User account
    if (req.body.status && employee.userId) {
      await User.findByIdAndUpdate(employee.userId, {
        status: req.body.status,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      data: {
        employee,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete employee
 * @route   DELETE /api/employees/:id
 * @access  Private (Admin/Manager only)
 */
exports.deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    // Delete associated User account if exists
    if (employee.userId) {
      await User.findByIdAndDelete(employee.userId);
    }

    await employee.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Employee and associated user account deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get employee statistics
 * @route   GET /api/employees/stats
 * @access  Private (Admin/Manager only)
 */
exports.getEmployeeStats = async (req, res, next) => {
  try {
    const stats = await Employee.aggregate([
      {
        $facet: {
          totalCount: [{ $count: 'count' }],
          statusCounts: [
            { $group: { _id: '$status', count: { $sum: 1 } } },
          ],
          departmentCounts: [
            { $group: { _id: '$department', count: { $sum: 1 } } },
          ],
          activeCount: [
            { $match: { status: 'active' } },
            { $count: 'count' },
          ],
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        stats: stats[0],
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create user accounts for employees without login credentials
 * @route   POST /api/employees/sync-users
 * @access  Private (Admin only)
 */
exports.syncEmployeeUsers = async (req, res, next) => {
  try {
    // Get all employees without userId
    const employeesWithoutUser = await Employee.find({ userId: null });

    if (employeesWithoutUser.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'All employees already have user accounts',
        data: { synced: 0 },
      });
    }

    const syncedCredentials = [];

    for (const employee of employeesWithoutUser) {
      const username = employee.firstName.toLowerCase();
      const loginEmail = `${username}@roletrack.com`;
      const defaultPassword = 'roletrack123';

      // Check if user already exists with this email
      let user = await User.findOne({ email: loginEmail });

      if (!user) {
        // Create new user
        user = await User.create({
          name: `${employee.firstName} ${employee.lastName}`,
          email: loginEmail,
          password: defaultPassword,
          role: 'employee',
          employeeId: employee._id,
          status: employee.status,
        });
      } else {
        // Link existing user to employee
        user.employeeId = employee._id;
        await user.save();
      }

      // Link user to employee
      employee.userId = user._id;
      await employee.save();

      syncedCredentials.push({
        employeeName: `${employee.firstName} ${employee.lastName}`,
        email: loginEmail,
        password: defaultPassword,
      });
    }

    res.status(200).json({
      success: true,
      message: `Successfully created user accounts for ${syncedCredentials.length} employees`,
      data: {
        synced: syncedCredentials.length,
        credentials: syncedCredentials,
      },
    });
  } catch (error) {
    next(error);
  }
};
