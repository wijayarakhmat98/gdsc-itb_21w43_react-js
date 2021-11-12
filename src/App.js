import "./App.css"
import data from "./data.json"
import Images from "./img.js"

function Search() {
	return (
		<div className="search">
			<p>SEARCH</p>
		</div>
	)
}

function Catalog() {
	return (
		<div className="catalog">
			<div><p>CATALOG</p></div>
			<div>
			{
				data.map((movie) => {
					return (
						<div className="movie" key={movie.title}>
							<div className="cover">
								<img src={Images[movie.cover]} alt={movie.alternative} />
							</div>
							<div className="title">
								<p><strong>{movie.title}</strong></p>
							</div>
							<p>({movie.year})</p>
						</div>
					)
				})
			}
			</div>
		</div>
	)
}

function Details() {
	return (
		<div className="details">
			<div><p>DETAILS</p></div>
		</div>
	)
}

function Wishlist() {
	return (
		<div className="wishlist">
			<div><p>WISHLIST</p></div>
		</div>
	)
}

function App() {
  return (
		<div>
			<Search />
			<div className="wrapper">
				<Wishlist />
				<Catalog />
				<Details />
			</div>
		</div>
	)
}

export default App;
