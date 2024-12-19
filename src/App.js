import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const initialRecipes = [
    {
      titulo: 'Tarta de Manzana',
      descripcion: 'Una deliciosa tarta de manzana.',
      ingredientes: ['Manzanas', 'Harina', 'Azúcar', 'Huevos', 'Mantequilla'],
      preparacion: 'Precalienta el horno, mezcla los ingredientes, hornea por 30 minutos.',
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtJ4tg9pUw8jhcHFwtp2yAM-xbEXrci6A5hg&s',
      video:"https://www.youtube.com/watch?v=bX1xhaMulko"

    },
    {
      titulo: 'Paella',
      descripcion: 'Un plato tradicional español.',
      ingredientes: ['Arroz', 'Azafrán', 'Mariscos', 'Caldo de pollo'],
      preparacion: 'Cocina los ingredientes en una paellera hasta que el arroz esté tierno.',
      imagem: 'https://th.bing.com/th/id/OIP.Q1Tkd3caF_dPhNuXa6pzqAHaFj?w=208&h=180&c=7&r=0&o=5&pid=1.7',
      video:"https://www.youtube.com/watch?v=nq_mTBjG6MM"
    },
    {
      titulo: 'Torrija Classsica',
      descripcion: 'Un plato tradicional español.',
      ingredientes: [' leche, 8 panes grandes y firmes o brioche 2, huevos, azúcar, 1 ramita de canela Harina de trigo.'],
      preparacion: 'En una cacerola, coloque la leche, la nata, el azúcar, la cáscara de naranja y la canela en rama y deje hervir. Cocine hasta que comience a hervir. Apaga el fuego y deja enfriar. Cuando la mezcla se haya enfriado, sumerja los trozos de pan en ella durante unos diez minutos (esto es lo que asegura unas torrijas extremadamente cremosas en su interior). Luego, cada tostada francesa debe gotearse cuidadosamente en harina y huevos batidos y freírse en aceite de oliva caliente hasta que estén doradas por ambos lados. Luego retíralas de la sartén, pásalas por la toalla de papel para eliminar el exceso de aceite de oliva y sírvelas, aún calientes, acompañadas de canela, miel, melaza o azúcar.',
      imagem: 'https://conteudo.imguol.com.br/c/entretenimento/c7/2023/04/07/torrijas-as-rabanadas-espanholas-1680899998622_v2_900x506.jpg',
      video:"https://www.youtube.com/watch?reload=9&feature=shared&v=7WvYg7uSlao"
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState(initialRecipes);
  const [showForm, setShowForm] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    titulo: '',
    descripcion: '',
    ingredientes: '',
    preparacion: '',
    imagem: '',
  });
  const [editIndex, setEditIndex] = useState(null);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(null);
  const [showFolderLinks, setShowFolderLinks] = useState(false);

  useEffect(() => {
    const storedRecipes = localStorage.getItem('userRecipes');
    if (storedRecipes) {
      const userRecipes = JSON.parse(storedRecipes);
      const combinedRecipes = [...initialRecipes, ...userRecipes];
      setRecipes(combinedRecipes);
    }
  }, []);

  const saveUserRecipes = (updatedRecipes) => {
    const userRecipes = updatedRecipes.filter((recipe) => !initialRecipes.some(
      (defaultRecipe) =>
        defaultRecipe.titulo === recipe.titulo &&
        defaultRecipe.descripcion === recipe.descripcion
    ));
    localStorage.setItem('userRecipes', JSON.stringify(userRecipes));
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRecipe = () => {
    setShowForm(true);
    setNewRecipe({ titulo: '', descripcion: '', ingredientes: '', preparacion: '', imagem: '' });
    setEditIndex(null);
  };

  const handleEditRecipe = (index) => {
    setShowForm(true);
    setNewRecipe({
      titulo: recipes[index].titulo,
      descripcion: recipes[index].descripcion,
      ingredientes: recipes[index].ingredientes.join(', '),
      preparacion: recipes[index].preparacion,
      imagem: recipes[index].imagem || '',
    });
    setEditIndex(index);
  };

  const handleDeleteRecipe = (index) => {
    const updatedRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(updatedRecipes);
    saveUserRecipes(updatedRecipes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ingredientesArray = newRecipe.ingredientes.split(',').map((ing) => ing.trim());
    let updatedRecipes;
    if (editIndex !== null) {
      updatedRecipes = [...recipes];
      updatedRecipes[editIndex] = { ...newRecipe, ingredientes: ingredientesArray };
    } else {
      updatedRecipes = [...recipes, { ...newRecipe, ingredientes: ingredientesArray }];
    }
    setRecipes(updatedRecipes);
    saveUserRecipes(updatedRecipes);
    setNewRecipe({ titulo: '', descripcion: '', ingredientes: '', preparacion: '', imagem: '' });
    setShowForm(false);
  };

  const handleChange = (e) => {
    setNewRecipe({
      ...newRecipe,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectRecipe = (index) => {
    setSelectedRecipeIndex(index);
  };

  const handleBackToList = () => {
    setSelectedRecipeIndex(null);
  };

  const toggleFolderLinks = () => {
    setShowFolderLinks(!showFolderLinks);
  };

  return (
    <div className="App">
      <header>
        <h1>Receitas espanholas</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar receta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button onClick={handleAddRecipe} className="add-recipe-button">Añadir Receta</button>
        
        {/* Botão para mostrar os links do folder */}
        <button onClick={toggleFolderLinks} className="folder">
          Visualizar Folder
        </button>

        {/* Links para os folders PT-BR e ES, mostrados apenas se showFolderLinks for true */}
        {showFolderLinks && (
  <div className="folder-links">
    <a href="./arquivos/FolderPortugues.pdf" target="_blank" rel="noopener noreferrer">
      📂 Folder em Português (PT-BR)
    </a>
    <a href="./arquivos/FolderEspanhol.pdf" target="_blank" rel="noopener noreferrer">
      📂 Folder en Español (ES)
    </a>
  </div>
)}

      </header>
      <main>
        {showForm ? (
          <form className="recipe-form" onSubmit={handleSubmit}>
            <h2>{editIndex !== null ? 'Editar Receta' : 'Añadir Nueva Receta'}</h2>
            <div>
              <label>Título:</label>
              <input
                type="text"
                name="titulo"
                value={newRecipe.titulo}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Descripción:</label>
              <input
                type="text"
                name="descripcion"
                value={newRecipe.descripcion}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Ingredientes (separados por coma):</label>
              <input
                type="text"
                name="ingredientes"
                value={newRecipe.ingredientes}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Preparación:</label>
              <textarea
                name="preparacion"
                value={newRecipe.preparacion}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Imagen (URL):</label>
              <input
                type="text"
                name="imagem"
                value={newRecipe.imagem}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Guardar Receta</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancelar</button>
          </form>
        ) : selectedRecipeIndex !== null && recipes[selectedRecipeIndex] ? (
          <div className="recipe-detail">
            <button onClick={handleBackToList}>Volver a la lista</button>
            <div className="recipe-card">
              <img 
                src={recipes[selectedRecipeIndex].imagem || 'default-image-url'} 
                alt={recipes[selectedRecipeIndex].titulo || 'default title'} 
              />
              <h2>{recipes[selectedRecipeIndex].titulo}</h2>
              <p><strong>Descripción:</strong> {recipes[selectedRecipeIndex].descripcion}</p>
              <p><strong>Ingredientes:</strong> {recipes[selectedRecipeIndex].ingredientes.join(', ')}</p>
              <p><strong>Preparación:</strong> {recipes[selectedRecipeIndex].preparacion}</p>
              <button onClick={() => handleEditRecipe(selectedRecipeIndex)}>Editar</button>
              <button onClick={() => handleDeleteRecipe(selectedRecipeIndex)}>Eliminar</button>
            </div>
          </div>
        )  : (
          <div className="recipes">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe, index) => (
                <div key={index} className="recipe-card" onClick={() => handleSelectRecipe(index)}>
                  <img src={recipe?.imagem || 'default-image-url'}   alt={recipe?.titulo || 'default title'} 
 className="recipe-image" />
                  <h2>{recipe.titulo}</h2>
                  <p><strong>Descripción:</strong> {recipe.descripcion}</p>
                </div>
              ))
            ) : (
              <p>No se encontraron recetas.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
