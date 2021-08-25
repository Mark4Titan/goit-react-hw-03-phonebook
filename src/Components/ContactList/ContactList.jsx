import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'

class ContactList extends Component {
	deleteId = Id => this.props.del(Id)

	createList = () => {
		return this.props.contacts.map(contact => {
			return (
				<li className="contactClass" key={uuidv4()} id={contact.id}>
					{`${contact.name}: ${contact.number}`}
					<button
						className="buttonClear"
						data-id={contact.id}
						onClick={() => this.deleteId(contact.id)}>
						Delete
					</button>
				</li>
			)
		})
	}

	render() {
		return (
			<div className="PhoneBook">
				<ul>{this.createList()}</ul>
			</div>
		)
	}
}
ContactList.propTypes = {
	contacts: PropTypes.array.isRequired,
	del: PropTypes.func.isRequired,
}
ContactList.defaultProps = {
	contacts: [],
}

export default ContactList
