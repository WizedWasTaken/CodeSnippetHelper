using CHS.DataAccess;
using CHS.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CHS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikeController(ILikeRepository likeRepository) : ControllerBase
    {
        private readonly ILikeRepository likeRepository = likeRepository;

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var likes = likeRepository.GetAll();
                return Ok(likes);
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
                var like = likeRepository.GetById(id);
                return Ok(like);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Post(Like like)
        {
            try
            {
                likeRepository.Add(like);
                return Ok("Like added successfully");
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
                likeRepository.Delete(id);
                return Ok("Like deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("snippet")]
        public IActionResult GetLikesFromPost(Snippet snippet)
        {
            try
            {
                var likes = likeRepository.GetLikesFromPost(snippet);
                return Ok(likes);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost("snippet")]
        public IActionResult AddNewLikeToSnippet([FromBody] Snippet snippet, [FromQuery] User user)
        {
            try
            {
                var like = likeRepository.AddNewLikeToSnippet(snippet, user);
                return Ok(like);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}