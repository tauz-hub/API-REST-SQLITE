export default async (req, res, next, requiredPermissions) => {
  const roleUser = req.tokenData.role;

  if (roleUser === 'master') {
    return next();
  }
  console.log(roleUser);
  if (!requiredPermissions.includes(roleUser)) {
    return res.status(401).json('é preciso um cargo maior para essa rota');
  }
  return next();
};
