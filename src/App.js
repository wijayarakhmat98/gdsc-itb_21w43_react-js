import "./App.css"
import React, {useState, useContext} from "react"
import data from "./data.json"
import Images from "./img.js"

const details_context = React.createContext()

function Search() {
	return (
		<div className="search">
			<p>SEARCH</p>
		</div>
	)
}

function Catalog() {
	const [, setInfo] = useContext(details_context)
	return (
		<div className="catalog">
			<p>CATALOG</p>
			<div>
			{
				data.map((movie) => {
					return (
						<div className="movie" key={movie.title}>
							<div className="cover">
								<img src={Images[movie.cover]} alt={movie.alternative} onClick={() => {setInfo(data.find(i => i.title === movie.title))}} />
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
	const [info, setInfo] = useContext(details_context)
	if (info == null) {
		return (
			<div className="details">
				<p>DETAILS</p>
			</div>
		)
	} else {
		return (
			<div className="details">
				<p>DETAILS</p>
				<div className="clear">
					<button onClick={() => {setInfo(null)}}>Clear</button>
				</div>
				<div>
					<div className="movie">
						<div className="cover">
							<img src={Images[info.cover]} alt={info.alternative} />
						</div>
						<div className="info">
							<h1>{info.title}</h1>
							<p>{info.year}</p>
							<p>{info.rating}</p>
							<p>{info.genre}</p>
							<p>{info.runtime}</p>
						</div>
					</div>
				</div>
				<p>{info.synopsis}</p>
				<hr />
				<h2>Writers</h2>
				<p>{info.writers}</p>
				<hr />
				<h2>Directors</h2>
				<p>{info.directors}</p>
				<hr />
			</div>
		)
	}
}

function Wishlist() {
	return (
		<div className="wishlist">
			<p>WISHLIST</p>
		</div>
	)
}

function App() {
	const [info, setInfo] = useState(null)
  return (
		<div>
			<details_context.Provider value={[info, setInfo]}>
				<Search />
				<div className="wrapper">
					<Wishlist />
					<Catalog />
					<Details />
				</div>
			</details_context.Provider>
		</div>
	)
}

export default App;
