class Node {
    constructor(data, left = null, right = null) {
      this.data = data;
      this.left = left;
      this.right = right;
    }
  }

  class Tree {
    constructor(array) {
      this.root = this.buildTree(array);
    }
  
    // Fonction pour construire un arbre binaire équilibré
    buildTree(array) {
      if (array.length === 0) return null;
  
      // Supprimer les doublons et trier le tableau
      const uniqueSortedArray = [...new Set(array)].sort((a, b) => a - b);
  
      // Fonction récursive pour construire l'arbre
      const buildRecursive = (arr) => {
        if (arr.length === 0) return null;
        const mid = Math.floor(arr.length / 2);
        const root = new Node(arr[mid]);
        root.left = buildRecursive(arr.slice(0, mid));
        root.right = buildRecursive(arr.slice(mid + 1));
        return root;
      };
  
      return buildRecursive(uniqueSortedArray);
    }
  }
  // fonction de visualisation
  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) return;
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  //Méthode d'insertion
  Tree.prototype.insert = function(value) {
    const insertRecursive = (node, value) => {
      if (node === null) return new Node(value);
      if (value < node.data) {
        node.left = insertRecursive(node.left, value);
      } else if (value > node.data) {
        node.right = insertRecursive(node.right, value);
      }
      return node;
    };
  
    this.root = insertRecursive(this.root, value);
  };
  ///Méthode de suppression
  Tree.prototype.deleteItem = function(value) {
    const deleteRecursive = (node, value) => {
      if (node === null) return null;
      if (value < node.data) {
        node.left = deleteRecursive(node.left, value);
      } else if (value > node.data) {
        node.right = deleteRecursive(node.right, value);
      } else {
        // Cas 1 : Pas de fils
        if (node.left === null && node.right === null) return null;
        // Cas 2 : Un seul fils
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;
        // Cas 3 : Deux fils
        let minLargerNode = node.right;
        while (minLargerNode.left !== null) {
          minLargerNode = minLargerNode.left;
        }
        node.data = minLargerNode.data;
        node.right = deleteRecursive(node.right, minLargerNode.data);
      }
      return node;
    };
  
    this.root = deleteRecursive(this.root, value);
  };
  //Méthode de recherche
  Tree.prototype.find = function(value) {
    const findRecursive = (node, value) => {
      if (node === null || node.data === value) return node;
      if (value < node.data) return findRecursive(node.left, value);
      return findRecursive(node.right, value);
    };
  
    return findRecursive(this.root, value);
  };
  //Parcours de l'arbre
  //Parcours en ordre de niveau (Level Order)
  Tree.prototype.levelOrder = function(callback) {
    const result = [];
    const queue = [this.root];
    while (queue.length > 0) {
      const node = queue.shift();
      if (callback) callback(node);
      result.push(node.data);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return callback ? undefined : result;
  };
  //Parcours en ordre infixe (InOrder)
  Tree.prototype.inOrder = function(callback) {
    const result = [];
  
    const inOrderRecursive = (node) => {
      if (node === null) return;
      inOrderRecursive(node.left);
      if (callback) callback(node);
      result.push(node.data);
      inOrderRecursive(node.right);
    };
  
    inOrderRecursive(this.root);
    return callback ? undefined : result;
  };
  //Parcours en ordre préfixe (PreOrder)
  Tree.prototype.preOrder = function(callback) {
    const result = [];
  
    const preOrderRecursive = (node) => {
      if (node === null) return;
      if (callback) callback(node);
      result.push(node.data);
      preOrderRecursive(node.left);
      preOrderRecursive(node.right);
    };
  
    preOrderRecursive(this.root);
    return callback ? undefined : result;
  };
  //Parcours en ordre postfixe (PostOrder)
  Tree.prototype.postOrder = function(callback) {
    const result = [];
  
    const postOrderRecursive = (node) => {
      if (node === null) return;
      postOrderRecursive(node.left);
      postOrderRecursive(node.right);
      if (callback) callback(node);
      result.push(node.data);
    };
  
    postOrderRecursive(this.root);
    return callback ? undefined : result;
  };
  //  Étape 6 : Calcul de la hauteur et de la profondeur Hauteur
  Tree.prototype.height = function(node) {
    if (node === null) return -1;
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  };
  //Profondeur
  Tree.prototype.depth = function(node, current = this.root, depth = 0) {
    if (current === null) return -1;
    if (node.data === current.data) return depth;
    if (node.data < current.data) return this.depth(node, current.left, depth + 1);
    return this.depth(node, current.right, depth + 1);
  };
  //Vérification de l'équilibre
  Tree.prototype.isBalanced = function(node = this.root) {
    if (node === null) return true;
    const heightDiff = Math.abs(this.height(node.left) - this.height(node.right));
    if (heightDiff > 1) return false;
    return this.isBalanced(node.left) && this.isBalanced(node.right);
  };
  //Rééquilibrage
  Tree.prototype.rebalance = function() {
    const values = this.inOrder();
    this.root = this.buildTree(values);
  };
  //Étape 8 : Script de pilote
  // Fonction pour générer un tableau de nombres aléatoires
const generateRandomArray = (size, max) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * max));
  };
  
  // Créer un arbre de recherche binaire à partir d'un tableau de nombres aléatoires < 100
  const randomArray = generateRandomArray(15, 100);
  const tree = new Tree(randomArray);
  console.log("Arbre initial :");
  prettyPrint(tree.root);
  
  // Confirmer que l'arbre est équilibré
  console.log("L'arbre est équilibré :", tree.isBalanced());
  
  // Imprimer tous les éléments par niveau, avant, après et dans l'ordre
  console.log("Parcours en ordre de niveau :", tree.levelOrder());
  console.log("Parcours en ordre infixe :", tree.inOrder());
  console.log("Parcours en ordre préfixe :", tree.preOrder());
  console.log("Parcours en ordre postfixe :", tree.postOrder());
  
  // Déséquilibrer l'arbre en ajoutant plusieurs nombres > 100
  tree.insert(150);
  tree.insert(200);
  tree.insert(250);
  console.log("Arbre après insertion de valeurs > 100 :");
  prettyPrint(tree.root);
  
  // Confirmer que l'arbre est déséquilibré
  console.log("L'arbre est déséquilibré :", !tree.isBalanced());
  
  // Équilibrer l'arbre
  tree.rebalance();
  console.log("Arbre rééquilibré :");
  prettyPrint(tree.root);
  
  // Confirmer que l'arbre est équilibré
  console.log("L'arbre est équilibré :", tree.isBalanced());
  
  // Imprimer tous les éléments par niveau, avant, après et dans l'ordre
  console.log("Parcours en ordre de niveau :", tree.levelOrder());
  console.log("Parcours en ordre infixe :", tree.inOrder());
  console.log("Parcours en ordre préfixe :", tree.preOrder());
  console.log("Parcours en ordre postfixe :", tree.postOrder());