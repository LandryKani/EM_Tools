const db = require("../models");
const Employe = db.employe;
const Role = db.role;
const Task = db.task;
const Projet = db.projet;
const Sequelize = require('sequelize');

//create project
exports.createProject = async (req, res) => {
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
        })
          .then(async (response) => {
            // Récupérer le dernier projet créé
            console.log("Ma réponse", response);
            const projetId = response.id;
            console.log("projetTask:", projetId);
            if (projetId != undefined) {
              console.log("projet:", projetId);
              res.status(200).send({ msg: "porject created successfully!!" });
              return;
            } else {
              console.log("erreur");
              return;
            }
          })
          .catch((err) => {
            res.status(500).send({ message: err.message });
          });
      } else {
        res.status(403).send({ msg: "You don't have this privilege!!" });
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
//list projects
exports.listProject = async (req, res) => {
  try {
    const projets = await Projet.findAll();
    res.json(projets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};
// get project by id
exports.getProject =(req, res) => {
  //Enemurate all task of project
  const projetId = req.params.id;
    Projet.findOne({
      where: Sequelize.literal(`id = ${projetId}`)
    }).then(
      projet=>{
        if(projet){
          res.json(projet)
        }else{
          res.status(404).send({msg: "Not found!!"})
        }
      }
    ).catch((err)=>{
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  })
};
//update project
exports.updateProject = (req, res) => {
  const projetId = req.params.id;
  Projet.update(req.body, {
    where: {
      id: projetId,
    },
  }).then((linesUpdated) => {
    if (linesUpdated) {
      res.status(200).send({ msg: "Line updated succesfully!!" });
    } else {
      res.status(404).send({msg:"No line were updated, sorry!!"})
    }
  }).catch((err)=>{
    console.error(err)
    res.status(500).send(err)
  })
};
//delete project
exports.deleteProject = (req, res) => {
  const projetId = req.params;
  console.log("id projet à supprimer:", projetId);
  Projet.destroy({
    where: {
      id: projetId.id,
    },
  })
    .then(() => {
      res.status(200).send({ msg: "projet supprimé avec succès !!" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
};

/************TASKS******************* */

//assing tasks
exports.assignTasks = async (req, res) => {
  try {
    const employees = await Employe.findAll({
      where: {
        username: req.body.employeeUsernames, // je crée un array de noms d'utilisateur
      },
    });

    const task = await Task.create({
      titre: req.body.titre,
      description: req.body.description,
      status_tache: req.body.status_tache,
      duree: req.body.duree,
      date_debut: req.body.date_debut,
      date_fin: req.body.date_fin,
      projetId: req.body.projetId,
    });
    await task.addEmployes(employees);
    res.status(200).send({ msg: "task created successfully!!" });
    return task.toJSON(); // retourne les données de la tâche sous forme de JSON
  } catch (error) {
    console.error(error);
    return null; // retourne null si une erreur est survenue lors de la création de la tâche
  }
};
//get tasks by id
exports.getTasks = async (req, res) => {
  //Enemurate all task of project
  const taskId = req.params.id;
  try {
    const tasks = await Task.findOne({
      where: Sequelize.literal(`id = ${taskId}`)
    });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};
//list task
exports.listTask = async (req,res)=>{
  try {
    const task = await Task.findAll();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
}
//update tasks
exports.updateTask = (req, res) => {
  const taskId = req.params.id;
  Task.update(req.body, {
    where: {
      id: taskId,
    },
  })
    .then((nbLinesUpdated) => {
      if (nbLinesUpdated) {
        res.status(200).send({ msg: "Tasks updated succesfully!!" });
      } else {
        res.status(404).send({ msg: "The tasks weren't updated sorry!!" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
};
//delete tasks
exports.deleteTask = (req, res) => {
  const taskId = req.params;
  console.log("id:", taskId);

  Task.destroy({
    where: {
      id: taskId.id,
    },
  })
    .then(() => {
      res.status(200).send({ msg: "tâche supprimée avec succès!!!" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
};

exports.generateRapport = async (username) => {
  try {
    // Récupérer les activités sur les tâches et les projets pour l'utilisateur spécifié
    const activitesTaches = await getActivitesTaches(username);
    const activitesProjets = await getActivitesProjets(username);

    // Créer un nouveau document PDF
    const doc = new PDFDocument();

    // Ajouter du contenu au document PDF
    doc.text(`Rapport des activités pour l'utilisateur ${username}`, { align: 'center', fontSize: 18, underline: true });

    doc.text('\n\nActivités sur les tâches :', 12);

    // Ajouter les activités sur les tâches
    activitesTaches.forEach((activite, index) => {
      doc.text(`${index + 1}. Projet : ${activite.projet}`);
      doc.text(`   Tâche : ${activite.tache}`);
      doc.text(`   État : ${activite.etat}`);
      doc.text(`   Assignée à : ${activite.utilisateur}`);
    });

    doc.text('\n\nActivités sur les projets :', 12);

    // Ajouter les activités sur les projets
    activitesProjets.forEach((activite, index) => {
      doc.text(`${index + 1}. Projet : ${activite.projet}`);
      doc.text(`   Description : ${activite.description}`);
    });

    // Générer le rapport en PDF
    const filePath = `./rapport_activites_${username}.pdf`;

    doc.pipe(fs.createWriteStream(filePath));
    doc.end();

    return filePath;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Fonction pour obtenir les activités sur les tâches pour un employé spécifié
const getActivitesTaches = (username) => {
  return Task.findAll({
    attributes: ['projet', 'tache', 'etat'],
    include: [
      {
        model: Employe,
        attributes: ['nom'],
        where: {
          username: username,
        },
      },
    ],
  }).map((task) => ({
    projet: task.projet,
    tache: task.tache,
    etat: task.etat,
    utilisateur: task.Employe.nom,
  }));
};

// Fonction pour obtenir les activités sur les projets pour un employé spécifié
const getActivitesProjets = (username) => {
  return Projet.findAll({
    attributes: ['projet', 'description'],
    include: [
      {
        model: Employe,
        attributes: [],
        where: {
          username: username,
        },
      },
    ],
  }).map((project) => ({
    projet: project.projet,
    description: project.description,
  }));
};

