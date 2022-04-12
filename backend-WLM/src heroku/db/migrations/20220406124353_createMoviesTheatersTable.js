exports.up =  function(knex) {
  //  await knex.raw("drop table if exists movies_theaters");
  return  knex.schema.createTable("movies_theaters", (table) => { 
                table.integer("theater_id").unsigned();
                table.foreign("theater_id").references("theaters.theater_id");
                table.integer("movie_id").unsigned().notNullable();
                table
                  .foreign("movie_id")
                  .references("movies.movie_id")
                  .onDelete("cascade");
                table.boolean("is_showing").default("false");
          })
          // .then(()=> knex("movies_theaters").select("*"));    
};

exports.down = function(knex) {
  // return knex("movies_theaters").truncate();
  return knex.schema.dropTable("movies_theaters"); 
};
