import React from 'react';

const RecipeForm = () => {
  return (
    <form>
      <input type="text" placeholder="Nome da Receita" />
      {/* Adicione mais campos conforme necessário */}
      <button type="submit">Adicionar Receita</button>
    </form>
  );
};

export default RecipeForm;
