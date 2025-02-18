const pathHandler = (req, res, next) => {
  const message = "Not found";
  return res.status(404).json({
    method: req.method,
    url: req.url,
    error: message,
  });
};

export default pathHandler;
