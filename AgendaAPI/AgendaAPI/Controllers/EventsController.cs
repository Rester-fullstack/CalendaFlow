using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using AgendaAPI.Data;
using AgendaAPI.Models;

namespace AgendaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class EventsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EventsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/events
        [HttpGet]
        public async Task<IActionResult> GetEvents()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var events = await _context.Events
                .Where(e => e.CreatedBy == userId)
                .ToListAsync();

            return Ok(events);
        }

        // POST: api/events
        [HttpPost]
        public async Task<IActionResult> CreateEvent(Event newEvent)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            newEvent.CreatedBy = userId;

            _context.Events.Add(newEvent);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEventById), new { id = newEvent.Id }, newEvent);
        }

        // GET: api/events/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEventById(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var evt = await _context.Events
                .FirstOrDefaultAsync(e => e.Id == id && e.CreatedBy == userId);

            if (evt == null) return NotFound();

            return Ok(evt);
        }

        // PUT: api/events/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvent(int id, Event updatedEvent)
        {
            if (id != updatedEvent.Id)
                return BadRequest();

            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var evt = await _context.Events.FindAsync(id);

            if (evt == null || evt.CreatedBy != userId)
                return NotFound();

            evt.Title = updatedEvent.Title;
            evt.Description = updatedEvent.Description;
            evt.StartTime = updatedEvent.StartTime;
            evt.EndTime = updatedEvent.EndTime;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/events/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var evt = await _context.Events.FindAsync(id);

            if (evt == null || evt.CreatedBy != userId)
                return NotFound();

            _context.Events.Remove(evt);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
