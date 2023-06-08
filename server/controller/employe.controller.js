exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.employeBoard = (req, res) => {
    res.status(200).send("Employe Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.directorBoard = (req, res) => {
    res.status(200).send("Director Content.");
  };