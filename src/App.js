import "./App.css"
import React, {useState, useContext} from "react"
import data from "./data.json"
import Images from "./img.js"

const catalog_context = React.createContext()
const details_context = React.createContext()
const wishlist_context = React.createContext()

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

	return (
		<div className="catalog">
			<p>CATALOG</p>
			<div>
				{list.map(movie => (
					<div className="movie" key={movie.title}>
						<div className="cover">
							<img src={Images[movie.cover]} alt={movie.alternative} onClick={() => {setInfo(movie)}} />
						</div>
						<div className="title">
							<p><strong>{movie.title}</strong></p>
						</div>
						<p>({movie.year})</p>
					</div>
				))}
			</div>
		</div>
	)
}

function Details() {
	const [info, setInfo] = useContext(details_context)
	const [wishlist, setWishlist] = useContext(wishlist_context)

	const add_wish = () => {
		if (!wishlist.includes(info)) {
			wishlist.push(info)
			setWishlist([...wishlist])
		}
	}

	const remove_wish = () => {
		wishlist.splice(wishlist.indexOf(info), 1)
		setWishlist([...wishlist])
	}

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
				<div className="toolbar">
					{(() => {
						if (wishlist.includes(info))
							return <input type="button" value="Remove from Wishlist" onClick={() => {remove_wish(info.title)}} />
						else
							return <input type="button" value="Add to Wishlist" onClick={() => {add_wish(info.title)}} />
					})()}
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
	const [, setDetails] = useContext(details_context)
	const [wishlist, ] = useContext(wishlist_context)

	return (
		<div className="wishlist">
			<p>WISHLIST</p>
			<div className="view">
				{wishlist.map(movie => (
					<div className="movie" key={movie.title}>
						<div className="cover">
							<img src={Images[movie.cover]} alt={movie.alternative} onClick={() => {setDetails(movie)}} />
						</div>
						<div className="info">
							<strong><p>{movie.title}</p></strong>
							<p>{movie.year}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

function App() {
	const [list, setList] = useState(data)
	const [info, setInfo] = useState(null)
	const [wishlist, setWishlist] = useState([])
  return (
		<div className="App">
			<catalog_context.Provider value={[list, setList]}>
			<details_context.Provider value={[info, setInfo]}>
			<wishlist_context.Provider value={[wishlist, setWishlist]}>
				<hr />
				<Search />
				<hr />
				<div className="wrapper">
					<Wishlist />
					<Catalog />
					<Details />
				</div>
				<hr />
			</wishlist_context.Provider>
			</details_context.Provider>
			</catalog_context.Provider>
		</div>
	)
}

export default App;
