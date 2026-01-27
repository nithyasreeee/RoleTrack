const express = require('express');
const router = express.Router();
const {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeStats,
} = require('../controllers/employeeController');
const { protect, authorize } = require('../middleware/auth');
const {
  createEmployeeValidation,
  updateEmployeeValidation,
  validateObjectId,
  queryValidation,
  validate,
} = require('../middleware/validation');

// All routes require authentication
router.use(protect);

// Statistics route (before /:id to avoid conflicts)
router.get('/stats', authorize('admin', 'manager'), getEmployeeStats);

// Main CRUD routes
router
  .route('/')
  .get(queryValidation, validate, getEmployees)
  .post(
    authorize('admin', 'manager'),
    createEmployeeValidation,
    validate,
    createEmployee
  );

router
  .route('/:id')
  .get(validateObjectId, validate, getEmployee)
  .put(
    authorize('admin', 'manager'),
    validateObjectId,
    updateEmployeeValidation,
    validate,
    updateEmployee
  )
  .delete(
    authorize('admin', 'manager'),
    validateObjectId,
    validate,
    deleteEmployee
  );

module.exports = router;
