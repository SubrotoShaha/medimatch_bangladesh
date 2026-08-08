/**
 * Symptom-Based Doctor Recommendation System for Bangladesh
 * Author: Subroto Kumar Shaha | Student of CSE
 * Brand: Steps With SP
 */

/**
 * Role-based Access Control Middleware
 * Factory function that returns middleware checking if the user's role
 * is included in the allowed roles list
 *
 * Usage: authorizeRoles('doctor', 'admin')
 */
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role '${req.user.role}' is not authorized to access this resource`,
      });
    }

    next();
  };
};

module.exports = { authorizeRoles };
