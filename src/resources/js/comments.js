export function initCommentToggles() {
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll(".news-post").forEach(post => {
      const commentButton = post.querySelector(".card > .card-footer > button:nth-child(2)");
      commentButton.addEventListener("click", () => {
        const comments = post.querySelector(".news-comments");
        if (commentButton.hasAttribute("opened")) {
          commentButton.removeAttribute("opened");
          commentButton.className = "button secondary medium";
          comments.style.display = "none";
        } else {
          commentButton.setAttribute("opened", "");
          commentButton.className = "button tertiary medium";
          comments.style.display = "flex";
        }
      });
    });
  });
}