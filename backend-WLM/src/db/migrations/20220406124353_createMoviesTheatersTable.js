exports.up =  function(knex) {
  return knex.schema.createTable
    ("movies_theaters", (table) => { 
      table.integer("theater_id").unsigned();
      table.foreign("theater_id").references("theaters.theater_id");
      table.integer("movie_id").unsigned().notNullable();
      table
        .foreign("movie_id")
        .references("movies.movie_id")
        .onDelete("cascade");
      table.boolean("is_showing").default("false");
    });    
};

exports.down = function(knex) {
  return knex.schema.dropTable("movies_theaters"); 
};
