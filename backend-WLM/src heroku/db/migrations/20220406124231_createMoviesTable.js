exports.up =  function(knex) {
  //  await knex.raw("drop table if exists movies");
  return knex.schema.createTable("movies", (table) => {
                table.increments("movie_id").primary();
                table.string("title");
                table.integer("runtime_in_minutes");
                table.string("rating");
                table.text("description");
                table.string("image_url");
                table.timestamps(true, true);
              })
              // .then(()=> knex("movies").select("*"));   
  
  //  await knex("movies").select("*").first();
};

exports.down = function(knex) {
  //return knex("movies").truncate();
  return knex.schema.dropTable("movies"); 

};
