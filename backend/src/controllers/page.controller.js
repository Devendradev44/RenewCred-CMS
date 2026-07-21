import Page from "../models/Page.js";

export const getPages = async (req, res) => {
  try {
    const pages = await Page.find().sort({ updatedAt: -1 });

    res.status(200).json(pages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getPageById = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);

    if (!page) {
      return res.status(404).json({
        message: "Page not found",
      });
    }

    res.json(page);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createPage = async (req, res) => {
  try {
    const page = await Page.create(req.body);

    res.status(201).json(page);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updatePage = async (req, res) => {
  try {
    const page = await Page.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!page) {
      return res.status(404).json({
        message: "Page not found",
      });
    }

    res.json(page);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deletePage = async (req, res) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);

    if (!page) {
      return res.status(404).json({
        message: "Page not found",
      });
    }

    res.json({
      message: "Page deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// export const getPageBySlug = async (req, res) => {
//   try {
//     const page = await Page.findOne({
//       slug: req.params.slug,
//       status: "published",
//     });

//     if (!page) {
//       return res.status(404).json({
//         message: "Page not found",
//       });
//     }

//     res.json(page);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
export const getPageBySlug = async (req, res) => {
  console.log("Requested slug:", req.params.slug);

  const page = await Page.findOne({
    slug: req.params.slug,
    status: "published",
  });

  console.log("Found page:", page);

  if (!page) {
    return res.status(404).json({ message: "Page not found" });
  }

  res.json(page);
};