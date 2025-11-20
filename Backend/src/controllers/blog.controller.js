import Blog from "../Schema/Blog.js";
import User from "../Schema/User.js";
import { nanoid } from "nanoid";
import validator from "validator";

export const createBlog = async (req, res) => {
  let authorId = req.user; // from verifyJWT
  let { title, des, banner, tags, content, draft, id } = req.body;

  //input-type validation --
  if (
    typeof title !== "string" ||
    typeof des !== "string" ||
    typeof banner !== "string" ||
    !Array.isArray(tags) ||
    typeof content !== "object"
  ) {
    return res.status(400).json({ error: "Invalid request parameters" });
  }

  title = validator.escape(title.trim());
  des = validator.escape(des.trim());
  banner = validator.trim(banner);
  tags = tags.map((tag) => validator.escape(tag.toLowerCase().trim()));

  if (
    banner &&
    !validator.isURL(banner, { protocols: ["https"], require_protocol: true })
  ) {
    return res.status(403).json({ error: "Invalid banner URL" });
  }

  if (!title.length) {
    return res.status(403).json({ error: "Title is required." });
  }

  if (!draft) {
    if (!des.length || des.length > 200)
      return res
        .status(403)
        .json({ error: "Description can't be more than 200 characters" });

    if (!banner.length) {
      return res.status(403).json({ error: "Banner  si required" });
    }
    if (!content.blocks.length) {
      return res.status(403).json({ error: "Content  is required" });
    }
    if (!tags.length || tags.length > 10) {
      return res.status(403).json({ error: "maximum of 10 tags allowed" });
    }
  }

  let blog_id =
    id ||
    title
      .replace(/[^a-zA-Z0-9]/g, " ")
      .replace(/\s+/g, "-")
      .trim() + nanoid();

  
  if (id) {
    // Update  --- implement later)
    return res.status(403).json({ error: "Update logic not implemented yet" });
  } else {
    let blog = new Blog({
      title,
      des,
      banner,
      content,
      tags,
      author: authorId,
      blog_id,
      draft: Boolean(draft),
    });

    try {
      const savedBlog = await blog.save();

      await User.findOneAndUpdate(
        { _id: authorId },
        {
          $inc: { "account_info.total_posts": draft ? 0 : 1 },
          $push: { blogs: savedBlog._id },
        }
      );
      return res.status(200).json({ id: savedBlog.blog_id });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export const getLatestBlogs = async (req, res) => {
  let { page } = req.body;
  let maxLimit = 5;
  const pageNumber = parseInt(page) || 1;
  const skipCount = (pageNumber - 1) * maxLimit;

  try {
    const blogs = await Blog.find({ draft: false })
      .populate(
        "author",
        "personal_info.profile_img personal_info.username personal_info.fullname -_id"
      )
      .sort({ publishedAt: -1 })
      .select("blog_id title des banner activity tags publishedAt -_id")
      .limit(maxLimit)
      .skip(skipCount)
    
    return res.status(200).json({ blogs });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
