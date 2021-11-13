import "./App.css"
import React, {useState, useContext} from "react"
import data from "./data.json"
import Images from "./img.js"

const catalog_context = React.createContext()
const details_context = React.createContext()

function Search() {
	const [, setList] = useContext(catalog_context)
	const [term, setTerm] = useState("")

	const find = () => {
		setList(data.filter((movie) => {
			const text = term.toLowerCase()
			const title = movie.title.toLowerCase()
			return title.search(text) !== -1
		}))
	}

	const clear = () => {
		setTerm("")
		setList(data)
	}

	return (
		<div className="search">
			<input type="text" value={term} onChange={(event) => {setTerm(event.target.value)}} />
			<input type="button" value="Search" onClick={find} />
			<input type="button" value="Clear" onClick={clear} />
		</div>
	)
}

function Catalog() {
	const [list, ] = useContext(catalog_context)
	const [, setInfo] = useContext(details_context)

	const update = (name) => {
		setInfo(data.find(movie => movie.title === name))
	}

	return (
		<div className="catalog">
			<p>CATALOG</p>
			<div>
			{
				list.map((movie) => {
					return (
						<div className="movie" key={movie.title}>
							<div className="cover">
								<img src={Images[movie.cover]} alt={movie.alternative} onClick={() => {update(movie.title)}} />
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
					<input type="button" value="Clear" onClick={() => {setInfo(null)}} />
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
	const [list, setList] = useState(data)
	const [info, setInfo] = useState(null)
  return (
		<div>
			<catalog_context.Provider value={[list, setList]}>
			<details_context.Provider value={[info, setInfo]}>
				<hr />
				<Search />
				<hr />
				<div className="wrapper">
					<Wishlist />
					<Catalog />
					<Details />
				</div>
				<hr />
			</details_context.Provider>
			</catalog_context.Provider>
		</div>
	)
}

export default App;
