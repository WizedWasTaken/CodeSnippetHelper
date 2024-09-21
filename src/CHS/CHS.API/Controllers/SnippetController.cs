using CHS.DataAccess;
using CHS.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CHS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SnippetController : ControllerBase
    {
        private readonly ISnippetRepository _snippetRepository;

        public SnippetController(ISnippetRepository snippetRepository)
        {
            _snippetRepository = snippetRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var snippets = _snippetRepository.GetAll();
                return Ok(snippets);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var snippet = _snippetRepository.GetById(id);
                if (snippet == null)
                {
                    return NotFound();
                }
                return Ok(snippet);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Post(Snippet snippet)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Ensure the SnippetId is not set so it will be auto-generated
                snippet.SnippetId = 0; // Set to 0 for non-nullable or use null for nullable identity column
                snippet.CreatedBy.UserId = 0; // Set to 0 for non-nullable or use null for nullable identity column

                _snippetRepository.Add(snippet);

                return CreatedAtAction(nameof(Post), new { id = snippet.SnippetId }, snippet);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public IActionResult Put(Snippet snippet)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _snippetRepository.Update(snippet);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _snippetRepository.Delete(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("user/{username}")]
        public IActionResult GetByUser(string username)
        {
            try
            {
                var snippets = _snippetRepository.GetByUser(username);
                return Ok(snippets);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("phrase/{phrase}")]
        public IActionResult GetByPhrase(string phrase)
        {
            try
            {
                var snippets = _snippetRepository.GetAllSortedByPhrase(phrase);
                return Ok(snippets);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("language/{language}")]
        public IActionResult GetByLanguage(Language language)
        {
            try
            {
                var snippets = _snippetRepository.GetAllSortedByLanguage(language);
                return Ok(snippets);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("likes")]
        public IActionResult GetByLikes()
        {
            try
            {
                var snippets = _snippetRepository.GetAllSortedByLikes();
                return Ok(snippets);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}