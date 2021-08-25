import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ContactForm from './Components/ContactForm/ContactForm'
import ContactList from './Components/ContactList/ContactList'
import Filter from './Components/Filter/Filter'
import './App.css'

const INITIAL_STATE = {
	contacts: [
		{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
		{ id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
		{ id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
		{ id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
	],
	filter: '',
	name: '',
	number: '',
}

class App extends React.Component {
	state = { ...INITIAL_STATE }

	formSubmitHandler = data => {
		this.repeatControl(data)
	}

	repeatControl = data => {
		let nameArray = this.state.contacts.map(cur => cur.name)
		if (!nameArray.includes(data.name)) {
			let arrayCont = [
				...this.state.contacts,
				{ id: uuidv4(), name: data.name, number: data.number },
			]
			return this.setState({ ...this.state, contacts: arrayCont })
		} else {
			alert(' Контакт вже є у телефонній книзі!!!')
		}
	}

	elementDelete = (arr, idContact) => {
		return arr.filter(elem => elem.id !== idContact)
	}

	deleteContactFromContactList = idContact => {
		let newArrAfterDel = this.elementDelete(this.state.contacts, idContact)
		this.setState({
			...this.state,
			contacts: [...newArrAfterDel],
		})
	}

	setFilterToState = filterData => {
		this.setState({ ...this.state, filter: `${filterData}` })
	}

	filterArr = filterArr => {
		return filterArr.filter(cur =>
			cur.name.toUpperCase().includes(this.state.filter)
		)
	}

	render() {
		const { contacts } = this.state

		return (
			<div className="PhoneBookBlock">
				<div className="Contact">
					<p>PhoneBook</p>
					<ContactForm onSubmitData={this.formSubmitHandler} />
				</div>
				<div className="Contact Pad">
					<p className="Filter">Contacts</p>
					<Filter setFilterToState={this.setFilterToState} />
					<ContactList
						contacts={this.filterArr(contacts)}
						del={this.deleteContactFromContactList}
					/>
				</div>
			</div>
		)
	}
}

export default App
