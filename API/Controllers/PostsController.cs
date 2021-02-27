using API.Data;

namespace API.Controllers
{
	public class PostsController
	{
		private readonly DataContext _context;

		public PostsController(DataContext context)
		{
			_context = context;
		}
	}
}