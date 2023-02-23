import Move from '../Move'
const ListPage = ({ searchResults }) => {

    const results = searchResults.map(movie => <Move key={movie._id} movie={movie} />)

    const content = results?.length ? results : <article><p>No Matching Movie found</p></article>

    return (
        <main>{content}</main>
    )
}
export default ListPage;