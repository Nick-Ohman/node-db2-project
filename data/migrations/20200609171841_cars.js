
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl =>{
      tbl.increments();
      tbl.string('VIN').notNullable().unique();
      tbl.string('Make').notNullable();
      tbl.string('Model').notNullable();
      tbl.integer('Mileage').notNullable();
      tbl.string('Trans');
      tbl.string('Title Status');

  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
