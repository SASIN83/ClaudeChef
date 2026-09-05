import Markdown from 'react-markdown'

export default function ClaudeRecipe(props) {
    return (
       <section className="suggested-recipe-container">
            <h2>Suggested Recipe:</h2>
            <article className="recipe-text">
                <Markdown>{props.recipe}</Markdown>
            </article>
        </section>
    )
}