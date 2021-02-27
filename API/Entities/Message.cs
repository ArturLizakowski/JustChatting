using System;
using System.Collections.Generic;

namespace API.Entities
{
    public class Message

    {
        public int AuthorId { get; set; }

        public AppUser Author { get; set; }

        public string Content {get; set; }

        public DateTime Modify { get; set; }

        public int RecipientId { get; set; }

        public AppUser Recipient { get; set; }
    }
}