using CHS.DataAccess;
using CHS.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CHS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SnippetRepository : ControllerBase
    {
        private readonly ISnippetRepository _snippetRepository;

        public SnippetRepository(ISnippetRepository snippetRepository)
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
                return Ok(snippet);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] Snippet snippet)
        {
            try
            {
                _snippetRepository.Add(snippet);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public IActionResult Put([FromBody] Snippet snippet)
        {
            try
            {
                _snippetRepository.Update(snippet);
                return Ok();
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
                return Ok();
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