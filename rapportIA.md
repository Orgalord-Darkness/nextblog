# Rapport d’usage de l’IA — Synthèse

### Extension copilot sur VsCode

Suggesions de textes et de contenu pour le fichier json about.json 
Suggestions de code 

### Conversations Copilot 

Problèmes rencontrés et explications fournies
1. Erreur Prisma : @relation défini deux fois

Message :

    The relation fields avatar on Model Blog and blog on Model Image both provide the references argument…
    both provide the fields argument…

Explication donnée :

    Dans Prisma, seul un des deux modèles d’une relation doit définir fields et references.

    L’autre modèle doit simplement déclarer la relation sans ces paramètres.

    L’erreur apparaît lorsque les deux côtés tentent de définir la clé étrangère.

Solution expliquée :

    Choisir un seul modèle pour porter la clé étrangère.

    Exemple corrigé :

prisma

model Blog {
  id       Int    @id @default(autoincrement())
  avatar   Image? @relation(fields: [avatarId], references: [id])
  avatarId Int?
}

model Image {
  id   Int   @id @default(autoincrement())
  blog Blog? @relation
}

2. Erreur Prisma : relation obligatoire impossible

Message :

    The relation field blog on Model Image is required. This is not valid because it's not possible to enforce this constraint…

Explication donnée :

    Prisma détecte que la clé étrangère associée est optionnelle.

    Donc le champ relationnel doit aussi être optionnel.

    Un champ relationnel obligatoire (Blog) n’est pas compatible avec une clé étrangère optionnelle (blogId Int?).

Solution expliquée :

    Rendre la relation optionnelle :

prisma

model Image {
  id   Int   @id @default(autoincrement())
  blog Blog? @relation(...)
}

---

### Claude Code (session Docker / Prisma)

Pourquoi je l'ai utilisé

Mon container Docker ne démarrait pas et je ne comprenais pas pourquoi. J'ai aussi voulu intégrer les migrations Prisma dans le workflow Docker.

Ce que j'ai demandé

J'ai demandé à l'IA d'analyser mon Dockerfile et mon docker-compose.yml pour trouver ce qui empêchait le container app de fonctionner. Puis, après plusieurs corrections, j'ai demandé comment intégrer Prisma correctement dans Docker pour que les migrations s'exécutent automatiquement.

Ce que j'ai compris



---

### Claude Code (session débogage Docker avancé)

Pourquoi je l'ai utilisé

Mon container Docker accumulait des erreurs en cascade et je n'arrivais plus à identifier l'origine du problème. Chaque correction en révélait une nouvelle, et j'avais besoin d'un regard extérieur pour analyser l'ensemble de la configuration.

Ce que j'ai demandé

J'ai soumis mon Dockerfile et mon docker-compose.yml pour un diagnostic complet. Ensuite, au fil des erreurs rencontrées, j'ai demandé des explications sur chacune : credentials Prisma incorrects, base de données inaccessible, droits insuffisants pour créer la shadow database, node_modules qui ralentissait le build, mauvaise version de Node, différence entre RUN et CMD dans un Dockerfile, et enfin comment rendre Next.js accessible depuis l'extérieur du container.

Ce que j'ai compris

J'avais l'impression que ça bloquait au npm install. Puis j'ai voulu savoir si je pouvais remplacer npm run build par npm run dev pour que l'app se mette à jour dynamiquement quand je modifiais les fichiers. En fin de session j'ai préféré simplifier les fichiers plutôt que les compliquer.

---

### Claude Code (session architecture Next.js — page d'accueil et couche d'accès aux données)

Pourquoi je l'ai utilisé

Je voulais construire la page d'accueil du blog en affichant les articles récents depuis la base de données, et je ne savais pas quelle méthode privilégier entre les API Routes, les Server Actions et d'autres approches de Next.js. J'avais aussi besoin de comprendre la syntaxe des requêtes Prisma pour écrire moi-même les fonctions d'accès aux données.

Ce que j'ai demandé

J'ai demandé quelle approche était la plus performante pour faire interagir Next.js avec la base de données sur la page d'accueil. Ensuite, après avoir compris la distinction entre les différentes méthodes, j'ai demandé comment organiser une couche d'accès aux données dans un répertoire lib/prisma/, avec un fichier par modèle Prisma (posts, users, blogs, images) contenant les opérations CRUD complètes. Enfin, j'ai demandé la syntaxe des principales méthodes Prisma pour pouvoir les implémenter moi-même.

Ce que j'ai compris

J'avais au départ l'intuition que les Server Actions seraient plus performants que les API Routes pour la page d'accueil, mais ce n'était pas la bonne approche. Pour afficher des données au chargement d'une page, le Server Component qui appelle directement Prisma est la meilleure solution car il n'y a aucun aller-retour HTTP superflu. Les Server Actions sont réservés aux mutations (créer, modifier, supprimer), et les API Routes servent à exposer un endpoint HTTP pour des clients externes comme une application mobile. En partant de ce que j'avais appris avec fs, j'ai voulu garder la même logique : des fichiers dans lib/ avec des fonctions qui font le lien avec la source de données. J'ai retenu qu'un fichier par modèle Prisma dans lib/prisma/ est une bonne organisation, et que ces fonctions ne doivent pas contenir de logique d'authentification, qui appartient à une couche supérieure.

---

### Claude Code (session seed Prisma — fixtures et données initiales)

Pourquoi je l'ai utilisé

Je voulais populer ma base de données avec des données de test cohérentes pour tous mes modèles Prisma, en suivant la bonne pratique recommandée par l'écosystème, et je ne savais pas comment structurer cela ni où placer la configuration.

Ce que j'ai demandé

J'ai demandé la création d'un fichier de seed Prisma couvrant tous les modèles du schéma (User, Blog, Image, Post) avec un seul utilisateur ayant le rôle admin, en utilisant la méthode recommandée.

Ce que j'ai compris



---

### Claude Code (session Prisma Studio et migration vers PostgreSQL)

Pourquoi je l'ai utilisé

Je n'arrivais pas à accéder à ma base de données depuis le navigateur et je pensais que Prisma était accessible via http://localhost:3309. J'ai aussi constaté que Prisma Studio refusait de charger les métadonnées de la base.

Ce que j'ai demandé

J'ai demandé à l'IA d'analyser la configuration Docker et Prisma pour identifier les problèmes qui m'empêchaient de travailler, et de les corriger en m'expliquant chaque point.

Ce que j'ai compris

Je m'étais fourvoyé sur la façon d'accéder à Prisma, en pensant pouvoir aller sur http://localhost:3309 depuis le navigateur pour voir la base de données. J'avais la préférence que l'IA répare Docker et Prisma plutôt que de changer de base de données, mais j'ai accepté la migration si c'était la meilleure solution.

---

### Claude Code (session authentification Next.js — inscription, connexion, JWT)

Pourquoi je l'ai utilisé

Je voulais mettre en place l'inscription utilisateur, la connexion et la mise à jour de la navbar selon l'état de la session. Je ne savais pas comment gérer les trois aspects principaux que sont la session, les cookies et le JWT dans Next.js.

Ce que j'ai demandé

J'ai demandé à être guidé sur l'inscription et la connexion avec du code simple issu de la documentation Next.js, tout en faisant les choses moi-même. J'ai demandé comment hasher un mot de passe avec jose, comment faire une méthode de login avec Prisma, et si cette méthode était nécessaire avec JWT. J'ai ensuite demandé comment construire la page de connexion, et comment gérer le formulaire côté client ou serveur.

Ce que j'ai compris

Au départ je pensais que jose servait aussi à hasher les mots de passe, mais jose ne sert qu'à créer et vérifier des JWT. Le hachage des mots de passe se fait avec bcryptjs, qui génère un hash différent à chaque fois grâce au salt, ce qui fait que l'on ne peut pas comparer en re-hashant le mot de passe saisi : il faut obligatoirement passer par bcrypt.compare. J'avais aussi envisagé que la méthode Prisma retourne directement un booléen après vérification, mais la bonne séparation est de laisser lib/prisma chercher l'utilisateur en base et de faire la vérification du mot de passe dans lib/auth, qui est ensuite appelé par le Server Action. Pour les formulaires, j'ai compris qu'un formulaire peut appeler un Server Action via l'attribut action sans avoir besoin de useState ni de "use client", car c'est le navigateur qui collecte les valeurs des champs au moment du submit et le serveur les récupère dans un objet FormData.