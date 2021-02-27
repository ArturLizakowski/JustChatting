using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
	public class Message
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		public int AuthorId { get; set; }

		public AppUser Author { get; set; }

		public string Content { get; set; }

		public DateTime Modify { get; set; }

		public int RecipientId { get; set; }

		public AppUser Recipient { get; set; }
	}
}