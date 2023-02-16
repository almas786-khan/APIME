function ProductDetails(props) {
    const { title, yearReleased } = props.product;

    return (
        <div>
            <div>
                <h1>{title}</h1>
                <h1>{yearReleased}</h1>
            </div>
        </div>
    );
}
export default ProductDetails;