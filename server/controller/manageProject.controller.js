const db = require("../models");
const Employe = db.employe;
const Role = db.role;
const Task = db.task;
const Projet = db.projet;

exports.CreateProject = async (req, res) => {
  try {
    const employe = await Employe.findByPk(req.employeId);
    console.log("resultat de la requete", employe);
    const roles = await employe.getRoles();
    for (let i = 0; i < roles.length; i++) {
      console.log("role:", roles);
      if (roles[i].name == "director" || roles[i].name == "admin") {
        console.log("role:", roles);
        const projet = await Projet.create({
          titre: req.body.titre,
          description: req.body.description,
          duree: req.body.duree,
          dateDebut: req.body.dateDebut,
          dateFin: req.body.dateFin,
        });

        res.status(200).send({ msg: "projet created successfully!" });
      } else {
        res.status(403).send({ msg: "You don't have this privilege!!" });
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.AssignTasks = async (req, res) => {
  // assign task by projects
  const { titre, description, assign_to } = req.body;
  const { projetId } = req.params;
  try {
    const projet = await Projet.findByPk(projetId);

    // Vérifie si 'assign_to' existe et est une chaîne
    if (typeof assign_to === "string" && assign_to.trim().length > 0) {
      const employees = assign_to.split(",").map((username) => ({ username }));
      const employe = await Employe.bulkCreate(employees, {
        ignoreDuplicates: true,
      });

      const task = await Task.create({
        titre,
        description,
        projetId: projetId,
      });

      await task.setEmploye(employe);
      res.json(task);
    } else {
      res.status(400).send({ message: "assign_to is not defined or is empty" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

exports.EnumerateTask = async (req, res) => {
  //Enemurate all task of project
  const { projetId } = req.params;
  try {
    const tasks = await Task.findAll({
      where: {
        projetId: projetId,
      },
      include: [Employe],
    });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

exports.ListProject = async (req, res) => {
  try {
    const projets = await Projet.findAll();
    res.json(projets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};
