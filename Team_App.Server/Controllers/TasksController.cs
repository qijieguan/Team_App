using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System;
using System.Text.Json;
using System.Text.Json.Nodes;
//using Newtonsoft.Json;

namespace Team_App.Server.Controllers
{
    public class Task
    {
        public string? Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string[]? Assign { get; set; }
        public int? Status { get; set; }
    }


    [ApiController]
    [Route("api/[controller]/[action]")]
    public class TasksDataController : Controller
    {
        const string connStr = "Host=localhost; Database=postgres; Username=postgres; Password=6969";
        private readonly NpgsqlConnection conn = new(connStr);


        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                conn.Open();

                string sql = "SELECT json_agg(\"Tasks\") FROM \"Tasks\"";

                using (var command = new NpgsqlCommand(sql, conn))
                {
                    var reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        return Ok(reader[0]);
                    }
                }

                conn.Close();
            }
            catch (Exception ex)
            {
                conn.Close();
                Console.WriteLine(ex.Message);
            }
            return Ok("Hello World");
        }

        [HttpPost]
        public IActionResult InsertEntries(JsonElement entries)
        {
            try
            {
                conn.Open();
                
                string keys = "(\"Id\", \"Title\", \"Description\", \"Assign\", \"Status\")";
                string values = "(:Id, :Title, :Description, :Assign, :Status)";
                string sql = "INSERT INTO \"Tasks\"" + keys + " values " + values;

                List<Task>? tasks = JsonSerializer.Deserialize<List<Task>>(entries);

                foreach (var task in tasks)
                {
                    using (var command = new NpgsqlCommand(sql, conn))
                    {
                        command.Parameters.AddWithValue("Id", task.Id);
                        command.Parameters.AddWithValue("Title", task.Title);
                        command.Parameters.AddWithValue("Description", task.Description);
                        command.Parameters.AddWithValue("Assign", task.Assign);
                        command.Parameters.AddWithValue("Status", task.Status);

                        command.ExecuteNonQuery();
                    }

                }
                
                conn.Close();
            }
            catch (Exception ex)
            {
                conn.Close();
                Console.WriteLine(ex.Message);
            }
            return Ok("Hello World");
        }

        [HttpPost]
        public IActionResult InsertEntry(JsonElement entry)
        {
            Task? task = JsonSerializer.Deserialize<Task>(entry);

            try
            {
                conn.Open();

                string keys = "(\"Id\", \"Title\", \"Description\", \"Assign\", \"Status\")";
                string values = "(:Id, :Title, :Description, :Assign, :Status)";
                string sql = "INSERT INTO \"Tasks\"" + keys + " values " + values;

                using (var command = new NpgsqlCommand(sql, conn))
                {
                    command.Parameters.AddWithValue("Id", task.Id);
                    command.Parameters.AddWithValue("Title", task.Title);
                    command.Parameters.AddWithValue("Description", task.Description);
                    command.Parameters.AddWithValue("Assign", task.Assign);
                    command.Parameters.AddWithValue("Status", task.Status);

                    command.ExecuteNonQuery();
                }

                conn.Close();
            }
            catch (Exception ex)
            {
                conn.Close();
                Console.WriteLine(ex.Message);
            }
            return Ok("Hello World");
        }

        [HttpPost]
        public IActionResult UpdateEntry(JsonElement data)
        {
            Task? task = JsonSerializer.Deserialize<Task>(data);

            try
            {
                conn.Open();

                string values = "\"Title\" = :Title, \"Description\" = :Description, \"Assign\" = :Assign, \"Status\" = :Status";
                string sql = "UPDATE \"Team\" SET " + values + " WHERE \"Id\" = :Id";

                using (var command = new NpgsqlCommand(sql, conn))
                {
                    command.Parameters.AddWithValue("Id", task.Id);
                    command.Parameters.AddWithValue("Title", task.Title);
                    command.Parameters.AddWithValue("Description", task.Description);
                    command.Parameters.AddWithValue("Assign", task.Assign);
                    command.Parameters.AddWithValue("Status", task.Status);
                    command.ExecuteNonQuery();
                }

                conn.Close();
            }
            catch (Exception ex)
            {
                conn.Close();
                Console.WriteLine(ex.Message);
            }
            return Ok("Hello World");
        }

        [HttpPost]
        public IActionResult DeleteEntry(JsonElement data)
        {
            Task? task = JsonSerializer.Deserialize<Task>(data);

            try
            {
                conn.Open();

                string sql = "DELETE FROM \"Tasks\" WHERE \"Id\" = " + task.Id;

                using (var command = new NpgsqlCommand(sql, conn))
                {
                    command.ExecuteNonQuery();
                }

                conn.Close();
            }
            catch (Exception ex)
            {
                conn.Close();
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

                string sql = "DELETE FROM \"Tasks\"";
                using (var command = new NpgsqlCommand(sql, conn))
                {
                    command.ExecuteNonQuery();
                }

                conn.Close();
            }
            catch (Exception ex)
            {
                conn.Close();
                Console.WriteLine(ex.Message);
            }
            return Ok("Hello World");
        }
    }
}
internal class Task
{
}