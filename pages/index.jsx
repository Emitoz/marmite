import { createClient } from "contentful";
import Recipe from "../components/RecipeCard";

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
  });

  const res = await client.getEntries({ content_type: 'recipe' });

  return {
    props: {
      recipes: res.items
    },
    revalidate: 1
  }
}

export default function Recipes({ recipes }) {
  console.log(recipes);
  return (
    <div className="recipe-list">
      { recipes.map(recipe => <Recipe recipe={recipe} key={recipe.sys.id}/>) }

      <style jsx>{`
        .recipe-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px 50px
        }
      `}</style>
    </div>
  )
}