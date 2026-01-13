let pages = [
  {
    "id": 1,
    "description": " Brillant étudiant en mythologie, vous ne vous attendiez pas à passer des vacances dans un château perdu au fond de la Transylvanie. A la recherche de Dracula, vous avez été kidnappé par trois individus et livré à un denommé 'Otto', il vous enferme dans un sous sol du chateau de Goraya et vous indique que son maitre va vous tuez. Vous êtes prisonnier depuis plusieurs jours sans pouvoir compter, Otto vient de temps à autre vous jeter un bout de pain et vous intimidez. Vous n'avez vu personne d 'autres. \n De toute évidence, seul Otto peut être d'une aide quelconque.  ",
    "choices": [
      { "label": "Vous hurlez pour le faire venir", "nextId": 59, "available": true },
      { "label": "Attendre son prochain passage", "nextId": 194, "available": true }
    ]
  },
  {
    "id": 2,
    "description": "",
    "choices": [
      { "label": "", "nextId": 3, "available": true },
      {
        "label": "",
        "nextId": 3,
        "available": false, "conditions": [
          { "type": "item", "value": "" },
          { "type": "money", "value": 0 },
          { "type": "dice", "value": 0 }
        ]
      }
    ]
  },
  {
    "id": 13,
    "description": "A peine avez-vous fait un pas vers l'armoire que les portes s'ouvrent brutalement. Deux zombies surgissent et se ruent sur vous ! Impossible de fuir, vous devez combattre.",
    "choices": [],
    "combat": {
      "state": "ONGOING",
      "enemies": {
        "type": "ZOMBIE",
        "count": 60,
        "power": 1
      },
      "dice": {
        "faces": 6,
        "weaponBonus": true
      }
    },
    "onWin": 235,
    "onLose": {
      "type": "DEATH",
      "deathTextId": "death_zombie_eaten"
    }
  },
  {
    "id": 21,
    "description": "Otto n est en fait pas très solide, il dit tout ce qu il sait et il ne sait pas grand chose. Il a été embauché il ya deux ans comme géolier et il 'a meme jamais rencontré le maitre, il est sonné par les coups que vou lui avez donné.",
    "choices": [{ "label": "Vous fuyer et vite ! ", "nextId": 73, "available": true }]
  },
  {
    "id": 32,
    "description": "La porte, verrouillée, est trop robuste pour être enfoncée. Mais peut etre possédez vous une clé en fer ? Si tel est le cas, vous l'utilisez (emporte à l'endroit précisé sur la pièce)",
    "choices": [{ "label": "Vous n'avez pas de clé, vous repartez dans le couloir sur la droite", "nextId": 385, "available": true }]
  },
  {
    "id": 36,
    "description": "Le sac contient une clé en fer, sur laquelle est gravé le chiffre 9, une boite d'allumette et un feutre que vous pouvez emporter avec vous, ainsi que le sac, si vous en êtes démuni.",
    "choices": [
      { "label": "Vous reprenez votre chemin dans le couloir", "nextId": 391, "available": true }
    ],
    "items": [
      { "weapons": "", "power": 0, "dé": 0 },
      { "money": 0 },
      { "stuff": ["sac à dos", "clé en fer n°9", "allumettes"] }
    ]
  },
  {
    "id": 51,
    "description": "Vous expliquez comment vous vous êtes retrouvé ici, Boris vous coupe : '-Garde ça pour quelqu'un que ça peut interesser, on peut peut être t'aider mais tout à un prix. Et ce prix se paie en pièce.'",
    "choices": [
      {
        "label": "Vous souhaitez voir ce qu'ils vendent (si vous en avez les moyens)",
        "nextId": 131, "available": true
      },
      {
        "label": "Vous n'avez pas d'argent, vous quittez les lieux par la porte qui se trouve à l'autre bout de la pièce",
        "nextId": 157, "available": true
      },
      {
        "label": "Vous tentez une attaque sur les deux hommes",
        "nextId": 284, "available": true
      }
    ]
  },
  {
    "id": 59,
    "description": "Vous interrompez Otto dans son repas, il se venge et vous frappe, vous perdez 3 points de vie",
    "choices": [{ "label": "vous souffez dans la cellule", "nextId": 194, "available": true }],
    "impact": [{ "endurance": -3 }, { "money": 0 }]
  },
  {
    "id": 73,
    "description": "ALors que vous alliez quitter la cellue, Otto vous supplie de le liberez, vous vous moquez de lui et vous vous engoufrez dans un couloir éclairé par rangé d'ampoule à la lumière vacillante. Vous ressentez que le Mal est omniprésent en ces lieux. Sur la droite, le couloir se termine sur une porte entrebâillée, alors que sur votre gauche,il se poursuit hors de portée de votre regard. ",
    "choices": [
      { "label": "Vous allez à droite", "nextId": 255, "available": true },
      {
        "label": "Vous allez à gauche",
        "nextId": 93, "available": true
      }
    ]
  },
  {
    "id": 84,
    "description": "Vous entrez dans un débarras qui sent fortement le moisi, l'endroit est sale, avec des crottes de rats couvrant le sol et des toiles d'araignées poussiéreuses dans tous les coins. Deux grandes caisses ont été poussés contre le fond du mur, vous y truvez deux sous et une boite de munitions. Vous refermez la porte.",
    "choices": [{ "label": "Vous poursuivez votre chemin dans le corridor", "nextId": 202, "available": true }],
    "impact": [{ "endurance": 0 }, { "money": 2 }]
  },
  {
    "id": 93,
    "description": "Bien que la tetntation soit forte de repasser dans la cellule d'Otto pour lui donner un coup de pied, vous pressez le pas dans le couloir. Vous parcourez une cinquantaine de mètres, jusqu'à arriver à la hauteur d'une portion de mur couverte de graffitis 'Ils sont là !' ou encore 'Nous sommes damnés !' il y en a bien d autres et tracés dans des langues qui vous sont incconues. Vous continuez et vous retrouvez face à un sac de toile noire pendu à un crochet.",
    "choices": [
      { "label": "Vous regardez ce qu'il contient.", "nextId": 36, "available": true },
      {
        "label": "Vous ne vous attardez pas.",
        "nextId": 391, "available": true
      }
    ]
  },
  {
    "id": 103,
    "description": "Le couloir se termine sr une porte à l aspect massif, peinte en blanc, de derrière laquelle ne provient aucun bruit.",
    "choices": [
      { "label": "Vous tentez de l'ouvrir", "nextId": 378, "available": true },
      {
        "label": "Vous préférez rebrousser chemin et partir dans la direction opposée",
        "nextId": 265, "available": true
      }
    ]
  },
  {
    "id": 109,
    "description": "Quatre Zombies viennent d'apparaitre au bout du couloirn s'approchant à lentes enjambées maladroites. Leur peau blafarde est couverte d'escarres d'où s'écoule un liquide verdâtre, alors que leurs cheveux, ou ce qu'ils en restent, sont graisseux. Leur bouche ouverte ne laisse voir que des chicots noirâtres et leurs yeux rouges sang regardet fixement devant eux. Il va falloir les combattre !",
    "choices": [],
    "combat": {
      "state": "ONGOING",
      "enemies": {
        "type": "ZOMBIE",
        "count": 4,
        "power": 1
      },
      "dice": {
        "faces": 6,
        "weaponBonus": true
      }
    },
    "onWin": 136,
    "onLose": {
      "type": "DEATH",
      "deathTextId": "death_zombie_eaten"
    }
  },
  {
    "id": 131,
    "description": "- Une sage décision marmonna Boris, un sourire malin au coin des lèvres. Tu es probablement curieux d'apprendre ce qui se trame dans ce château ? Pour 10 pièces, tu sauras tout. ",
    "choices": [
      {
        "label": "Vous tendez l'argent à Boris",
        "nextId": 229, "available": true
      },
      {
        "label": "Vous ne souhaitez pas payer, vous quittez les lieux par la porte qui se trouve à l'autre bout de la pièce",
        "nextId": 157, "available": true
      },
      {
        "label": "Vous tentez une attaque sur les deux hommes",
        "nextId": 284, "available": true
      }
    ]
  },
  {
    "id": 136,
    "description": "L'un des Zombies tenait un pistolet (1d+2). En grimaçant, vous le tirez de ses énormes doigts. Il vous semble en parfait état de marche mais n'est pas chargé, si vous possédez des munitions, il vous sera utile ! En poursuivant votre chemin, vous remarquez une grande caisse en bois posé un côté d'un regard fermé par un couvercle de fer. ",
    "choices": [
      {
        "label": "Vous ouvrez la caisse",
        "nextId": 152, "available": false
      },
      {
        "label": "Vous tenter d'ouvrir le couvercle de la bouche d'égout",
        "nextId": 210, "available": false
      },
      {
        "label": "Vous préférez poursuivre votre chemin",
        "nextId": 337, "available": false
      }
    ],
    "items": [
      { "weapons": "pistolet", "power": 2, "dé": 1 },
      { "money": 0 },
      { "stuff": [] }
    ]
  },
  {
    "id": 141,
    "description": "Le matealas caché un passage étroit, si étroit que vous pouvez à peine y glisser votre corps. Il fait trop combre pour y avoir quelque chose.",
    "choices": [
      { "label": "Vous décidez de vous y engagez", "nextId": 244, "available": true },
      {
        "label": "Il faut être fou pour s'y engouffrer, vous reprenez votre chemin.",
        "nextId": 385, "available": true
      }
    ]
  },
  {
    "id": 157,
    "description": "La porte s'ouvre sur un autre couloir aux murs blancs, éclairés par la lumières blafardes de néons. rle mur de gauche, une insciption attire aussitôt votre attention. 'A l'aide' est écrit grossièrement en rouge sombre; du sang, à n'en pas douter. Un peu plus loin, vous débouchez dans un nouveau couloir",
    "choices": [
      { "label": "Vous allez vers la gauche", "nextId": 103, "available": true },
      {
        "label": "Vous allez vers la droite",
        "nextId": 265, "available": true
      }
    ]
  },
  {
    "id": 178,
    "description": "La boite contien un petit canif, 15 pièces et une pelote de ficelle, vous rangez tout ça dans votre sac et regagnez le couloir.",
    "choices": [{ "label": "Vous regagnez le couloir", "nextId": 93, "available": true }],
    "items": [
      { "weapons": "canif", "power": 2, "dé": 1 },
      { "money": 15 },
      { "stuff": ["pelote de ficelle"] }
    ]
  },
  {
    "id": 194,
    "description": "Plusieurs heures s'écoule et Otto est de retour, vous decidez de tenter votre chance",
    "choices": [
      { "label": "Vous tentez de le frapper à la tête", "nextId": 299, "available": true },
      {
        "label": "Vous essayer de le neutraliser par une bonne prise au corps",
        "nextId": 345, "available": true
      }
    ]
  },
  {
    "id": 202,
    "description": "Contre le mur de droite est posé un vieux matelas crasseux et aux ressorts rouillées. Peut être n'est il pas là hasard ?",
    "choices": [
      { "label": "Vous l'examinez", "nextId": 141, "available": true },
      {
        "label": "Vous poursuivez votre chemin",
        "nextId": 385, "available": true
      }
    ]
  },
  {
    "id": 229,
    "description": "Boris vous apprend que Gringrich Yurr est un fou furieux qui veut devenir le maître du monde. Il déteste les hommes et est en train de se constituer une armée de zombies. Les seuls qu'il cotoie sont ses serviteurs et les scientifiques qui travaillent sur le virus zombie. Avant de pouvoir injecté ce virus, les humains capturés doivent etre dans un tel état de faiblesse que leur organisme ne peut resister. Yurr fait capturé des hommes par centaines pour les transformer. La horde est gardée dans les sous sols. Boris est persuadé que lorsque Yurr sera prêt à lacher les zombies dans le monde, il se transformera lui même en zombie pour les diriger. Il vous informe que pour sauver le monde, il faudra tuer tous les zombies, sans en oublier un seul. Vous êtes abasourdi, vous vous demandez si tout cela est vrai. Mais vous vous dites que si vous croisez un de ces zombies, vous aurez enfin mis la main sur une créatures que vous cherchez depuis si longtemps ! Dorénavant, vous n'avez qu'un seul but, éliminer tous les zombies du château. '-Encore un mot l'étranger, prends garde si tu es blessé, ton sang e dois pas être en contact du sang d'une de ces créatures, le virus est contagieux.'  ",
    "choices": [
      {
        "label": "Vous demandez à Boris si quelchose dans la réserve peut vous etre utile",
        "nextId": 329, "available": true
      },
      {
        "label": "Vous quittez les lieux par la porte qui se trouve à l'autre bout de la pièce",
        "nextId": 157, "available": true
      }
    ],
    "impact": [{ "endurance": 0 }, { "money": -10 }]
  },
  {
    "id": 235,
    "description": "Vous vous débarassez desdeux zombies qui à lévidence n'étaient pas les plus nerveux. Mais vous êtes bien conscient que si vous ne trouvez pas une arme, vous ne viendrez pas à bout d'une horde. Les ecartant du pied, vous vous approchez de l'armoire, vous trouvez une trousse de soin qui vous fait gagner 4 points d'endurance, vous trouvez également 2 boites de balles.",
    "choices": [
      { "label": "Vous sortez de la buanderie et retournez dans le couloir", "nextId": 265, "available": true }
    ],
    "impact": [{ "endurance": 4 }, { "money": 0 }],
    "items": [
      { "weapons": "munitions", "power": 2, "dé": 1 },
      { "money": 0 },
      { "stuff": [""] }
    ]
  },
  {
    "id": 244,
    "description": "Vous rampez dans ce passage étroit pendant plusieurs mètres, jusqu'à déboucher dans ce qui vous semble être une vieille forge. un odeur infecte vous vient au nez, semblable à celle qu'aurait pu dégager un tas d'oeufs pourris, et depuis un certain temps d'ailleurs ! Contre le mur se trouve un vieil établi et des outils, brisés pour le plupart. Un grand rideau orange pend à travers la pièce. Vous n'avez pas le temps de faire un pas de plus, le ridea s'éacarte et laisse jaillir une hirde de créatures vétus de haillons, n'ayant d'humain que l'apparence, hurlant les bras tendus ! Leur bras sont recouverts de cloques, de bubons purulents et de crevasses sanguinolentes. Vous n'avez pas le temps de vous hissez dans le conduit, vous devez les affronter !",
    "choices": [],
    "combat": {
      "state": "ONGOING",
      "enemies": {
        "type": "ZOMBIE",
        "count": 8,
        "power": 1
      },
      "dice": {
        "faces": 6,
        "weaponBonus": true
      }
    },
    "onWin": 395,
    "onLose": {
      "type": "DEATH",
      "deathTextId": "death_zombie_eaten"
    }
  },
  {
    "id": 255,
    "description": "Vous arrivez dans la chambre d'Otto, son repas miteux mijote, vous avez tellement faim que cela vous donne envie",
    "choices": [
      { "label": "Vous terminiez le repas", "nextId": 317, "available": true },
      {
        "label": "Vous allez à droite quittez les lieux",
        "nextId": 93, "available": true
      }
    ]
  },
  {
    "id": 265,
    "description": "Dans le mur droit, vous remarquez une petite porte qui ne doit pas dépasser un mètre de haut, et qui n'est fermée que par un simple loquet.",
    "choices": [
      { "label": "Vous ouvrez la porte et entrez", "nextId": 84, "available": true },
      {
        "label": "Vous ignorez la porte et continuez dans le couloir",
        "nextId": 202, "available": true
      }
    ]
  },
  {
    "id": 299,
    "description": "Gêné par les chaines qui vous entravent et affaibli par la faim, votre attaque est un échec cuisant. Otto vous assène un coup violent à la tête. - Tu vas me payer ça ! Le crâne fracassé, vous perdez connaissance. Vous vous réveillerez plus tard, dans une pièce blanche, les néons vous aveuglent, vous entendez des grognemente et apercevez des zombies ! Un homme vétu d une blouse blanche s'approche de vous, il tient un seringue contenenant un liquide rouge et vous l'injecte. -Bon travail, dit-il avec un petit rire en voyant que vous vous transformez déjà en zombie. Dans peu de temps, vous ferez partie de l'armée de zombies de Gringrich Yurr. Vous pouvez en être fier.",
    "autoEffect": {
      "type": "DEATH",
      "reason": "TURNED_INTO_ZOMBIE",
      "deathTextId": "quick_death"
    }
  },
  {
    "id": 317,
    "description": "Bien que le repas ne correspond pas à vos habitudes, vous le dévorez sans en laissez une miette, vous gagnez deux points de vie. Votre regard apperçoit une petite boite métallique qui a roulé sous le fourneau",
    "choices": [
      { "label": "Si vous êtes curieux, vous ouvrez la boite", "nextId": 178, "available": true },
      {
        "label": "Vous ne perdez pas de temps et poursuivez votre chemin",
        "nextId": 93, "available": true
      }
    ],
    "impact": [{ "endurance": 2 }, { "money": 0 }]
  },
  {
    "id": 329,
    "description": "Boris vous fait la liste de ce qu'il a",
    "choices": [
      {
        "label": "Maintenant, vous demandez à Boris s'il vend aussi des provisions",
        "nextId": 28, "available": false
      },
      {
        "label": "Vous poursuivez votre chemin par la porte au fond de la réserve",
        "nextId": 157, "available": true
      }
    ],
    "impact": [{ "endurance": 2 }, { "money": 0 }]
  },
  {
    "id": 345,
    "description": "Vous attaquez Otto et ça fonctionne ! il tombe et s'assome, vous en proftez pour voler les clés et vous libérez, c'est peut le moment pour lui poser quelques questions ?",
    "choices": [
      { "label": "Vous l'attachez et décidez de l'interroger", "nextId": 21, "available": true },
      { "label": "Vous quittez ce cachot en courant !", "nextId": 73, "available": true }
    ]
  }, {
    "id": 378,
    "description": "La porte s'ouvre sur une petite buanderie. DAns un coin se dresse une haute et imposante armoire blanche, à côté de laquelle se trouvent un baquet renversé, ainsi que deux balais et une serpillère. Un panier en plastique déborde de linge sale. En dessous vous pouvez voir une machine à laver ainsi qu'un sèche linge. Contre le mur à gauche de la porte, il y a un vieux sac noir juste à côté d'une rangée de chaussures.",
    "choices": [
      { "label": "Vous ouvrez le sac", "nextId": 291, "available": false },
      { "label": "Vous préférez ouvrir l'armoire pour trouver quelque chose d'utile", "nextId": 13, "available": true }
    ]
  },
  {
    "id": 385,
    "description": "Le couloir fait un coude sur la droite, avant de tourner de nouveau sur la droite une cinquantaine de mètres plus loin. Enfin, vous arrivez à la hauteur d'une porte en fer de couleur noire, située sur le mur de droite. Elle est solidement verrouillée et vous n'avez pas de quoi l'ouvrir, vous réflechissez à ce que vous pouvez faire...",
    "choices": [
      {
        "label": "Et la réponse ne tarde pas à venir...",
        "nextId": 109, "available": true
      },

    ]
  },
  {
    "id": 391,
    "description": "Au bout de ce couloir se trouve une porte. VOus pouvez entendre des bruits de pas. Vous n'avez pas d'autres choix, vous devez découvrir ce qu'il y a derrière. Vous ouvrez la porte et tombez sur une vaste réserve, dans laquelle un homme, une ordinateur portable entre les mains, est en train de prendre des notes. Agê d'une trentaine d'année, il a le crane rasé et est d'una apparence musculeuse, portant une combinaison orange et rangers noires '-Tiens,tiens, dit-il en vus fixant comme si vou étiez l'une de ses étagères. Jusqu'à aujourd'hui, personne ne s'était échappé des souterrains d'Otto. Vous pourriez me fournir une seule bonne raison de pas donner l'alerte ? Avant même que vous ne puissiez répondre, il reprend :'L'argent ! Le pognon ! Et vite ! Au fait moi c'est Boris..' '-Et moi Gregor', poursuit une vois rauque venant de la gauche ",
    "choices": [
      {
        "label": "Vous apercevez une porte et tentez de courir pour l'atteindre",
        "nextId": 157, "available": true
      },
      {
        "label": "Vous décidez de dicuter avec ces deux hommes",
        "nextId": 51, "available": true
      }
    ]
  },
  {
    "id": 395,
    "description": " Vous enjambez les corps des Zombies encore agités de soubresauts, vous jetez un oeil autour de vous. Vous remarquer une pince de forge, que vous mettez dans votre sac. Derrière le rideau, une porte en fer noir s'ouvre dans un renfoncement du mur. ",
    "choices": [
      {
        "label": "Vous êtes trop curieux et ouvrez la porte",
        "nextId": 32, "available": true
      },
      {
        "label": "Vous avez besoin de soufflez cinq minutes avant de retomber sur une mauvaise surprise, vous regagnez le couloir vers la droite",
        "nextId": 385, "available": true
      }
    ],
    "items": [
      { "weapons": "Pince de forge" },
      { "money": 0 },
      { "stuff": [""] }
    ]
  }
];

export { pages };