
exports.up = function(knex) {
  return knex.schema.createTable('schedule', function(table) {
    table.increments('id');
    table.text('scheduleData');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('schedule');
};
