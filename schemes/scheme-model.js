const db = require('./../data/db-config');

//array of schemes
function find() {
	return db('schemes');
}

//single user or null
function findById(id) {
	return db('schemes')
		.where({ id })
		.first();
}

function findSteps(id) {
	return db('steps as st')
		.join('schemes as sc', 'sc.id', 'st.scheme_id')
		.select('sc.scheme_name', 'st.step_number', 'st.instructions')
		.where('sc.id', id)
		.orderBy('st.step_number');
}

function add(scheme) {
	return db('schemes')
		.insert(scheme, 'scheme')
		.then(ids => {
			console.log('iddds', ids);
			return findById(ids[0]);
		});
}

function update(changes, id) {
	return db('schemes')
		.where({ id })
		.update(changes);
}

function remove(id) {
	return db('schemes')
		.where({ id })
		.del();
}

module.exports = {
	find,
	findById,
	findSteps,
	add,
	update,
	remove
};
