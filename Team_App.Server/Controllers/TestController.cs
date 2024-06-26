using Microsoft.AspNetCore.Mvc;
using Npgsql;

using System.Text.Json;
//using Newtonsoft.Json;



namespace Team_App.Server.Controllers
{
    
    public class Person
    {
        public int? Id { get; set; }
        public string? ProfileUrl { get; set; }
        public string? Name { get; set; }
        public string? Role { get; set; }
        public int? Salary { get; set; }
        public string? Bio { get; set; }
    }
    


    [ApiController]
    [Route("api/[controller]/[action]")]
    public class TestDataController : Controller
    {
        const string connStr = "Host=localhost; Database=postgres; Username=postgres; Password=6969";
        private readonly NpgsqlConnection conn = new(connStr);


        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                conn.Open();

                if (conn.State == System.Data.ConnectionState.Open)
                {
                    Console.WriteLine("Success open postgreSQL connection.");
                }

                //string sql = "SELECT REPLACE(jsonb_agg(\"Team\"), '\"', '\\\"') FROM \"Team\"";
                string sql = "SELECT json_agg(\"Team\") FROM \"Team\"";
                //string sql = "SELECT * FROM \"Team\"";

                using (var command = new NpgsqlCommand(sql, conn))
                {
                    var reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        //testing basic serialize/deserialize code

                        //List<Person>? people = JsonConvert.DeserializeObject<List<Person>>((string)reader[0]);


                        //Original bug --- need deserializing
                       
                        //Console.WriteLine(reader[0]);
                        return Ok(reader[0]);
                    }
                }

                conn.Close();
                Console.WriteLine("Success close postgreSQL connection.");
            }
            catch (Exception ex)
            {
                conn.Close();
                Console.WriteLine("Success close postgreSQL connection.");
                Console.WriteLine(ex.Message);
            }
            return Ok("Hello World");
        }

        [HttpPost] 
        public IActionResult InsertEntries(JsonElement entries)
        {
            Console.WriteLine("Insert Called!");

            try
            {
                conn.Open();

                if (conn.State == System.Data.ConnectionState.Open)
                {
                    Console.WriteLine("Success open postgreSQL connection.");
                }


                string keys = "(\"Id\", \"ProfileUrl\", \"Name\", \"Role\", \"Salary\", \"Bio\")";
                string values = "(:Id, :ProfileUrl, :Name, :Role, :Salary, :Bio)";
                string sql = "INSERT INTO \"Team\"" + keys + " values " + values;


                List<Person>? people = JsonSerializer.Deserialize<List<Person>>(entries);

                foreach (var person in people)
                {
                    using (var command = new NpgsqlCommand(sql, conn))
                    {
                        command.Parameters.AddWithValue("Id", person.Id);
                        command.Parameters.AddWithValue("ProfileUrl", person.ProfileUrl);
                        command.Parameters.AddWithValue("Name", person.Name);
                        command.Parameters.AddWithValue("Role", person.Role);
                        command.Parameters.AddWithValue("Salary", person.Salary);
                        command.Parameters.AddWithValue("Bio", person.Bio);

                        command.ExecuteNonQuery();
                    }
                    
                }

                conn.Close();
                Console.WriteLine("Success close postgreSQL connection.");
            }
            catch (Exception ex)
            {
                conn.Close();
                Console.WriteLine("Success close postgreSQL connection.");
                Console.WriteLine(ex.Message);
            }
            return Ok("Hello World");
        }

        [HttpPost]
        public IActionResult InsertEntry(JsonElement entry)
        {
            Console.WriteLine("Insert Called!");

            Person ? person = JsonSerializer.Deserialize<Person>(entry);

            Console.WriteLine(person);

            try
            {
                conn.Open();

                if (conn.State == System.Data.ConnectionState.Open)
                {
                    Console.WriteLine("Success open postgreSQL connection.");
                }
 
                string keys = "(\"Id\", \"ProfileUrl\", \"Name\", \"Role\", \"Salary\", \"Bio\")";
                string values = "(:Id, :ProfileUrl, :Name, :Role, :Salary, :Bio)";
                string sql = "INSERT INTO \"Team\"" + keys + " values " + values;

                using (var command = new NpgsqlCommand(sql, conn))
                {
                    command.Parameters.AddWithValue("Id", person.Id);
                    command.Parameters.AddWithValue("ProfileUrl", person.ProfileUrl);
                    command.Parameters.AddWithValue("Name", person.Name);
                    command.Parameters.AddWithValue("Role", person.Role);
                    command.Parameters.AddWithValue("Salary", person.Salary);
                    command.Parameters.AddWithValue("Bio", person.Bio);

                    command.ExecuteNonQuery();
                }
                
                conn.Close();
                Console.WriteLine("Success close postgreSQL connection.");
            }
            catch (Exception ex)
            {
                conn.Close();
                Console.WriteLine("Success close postgreSQL connection.");
                Console.WriteLine(ex.Message);
            }
            return Ok("Hello World");
        }

        [HttpPost]
        public IActionResult Clear()
        {
            try
            {
                conn.Open();

                if (conn.State == System.Data.ConnectionState.Open)
                {
                    Console.WriteLine("Success open postgreSQL connection.");
                }

                string sql = "DELETE FROM \"Team\"";
                using (var command = new NpgsqlCommand(sql, conn))
                {
                    command.ExecuteNonQuery();
                }

                conn.Close();
                Console.WriteLine("Success close postgreSQL connection.");
            }
            catch (Exception ex)
            {
                conn.Close();
                Console.WriteLine("Success close postgreSQL connection.");
                Console.WriteLine(ex.Message);
            }
            return Ok("Hello World");
        }
    }
}
internal class Person
{
}