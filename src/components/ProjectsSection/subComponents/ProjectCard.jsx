import CardLink from "./CardLink.jsx";
import { padIndex } from "./utilities.jsx";
import {
  cardBaseClass,
  cardSlideNextClass,
  cardSlidePrevClass,
  cardHeaderRowClass,
  cardTitleClass,
  cardCounterClass,
  cardImageRowClass,
  cardNavButtonClass,
  cardImageFrameClass,
  cardImageClass,
  cardImagePlaceholderClass,
  cardScrollBlockClass,
  cardDescriptionClass,
  cardStackListClass,
  cardLinkRowClass,
} from "../styles/tailwindStyles.jsx";
import "../styles/styles.css";

function ProjectCard({
  project,
  index,
  total,
  onPrev,
  onNext,
  direction = "next",
}) {
  const base = import.meta.env.BASE_URL;
  const {
    title,
    description,
    stack,
    repoUrl,
    liveUrl,
    imageUrl,
    videoUrl,
  } = project;
  const resolvedVideoUrl = videoUrl
    ? `${base}${videoUrl}`
    : "";

  const resolvedImageUrl = imageUrl
    ? `${base}${imageUrl}`
    : "";

  return (
    <div
      role="group"
      aria-label={`Project ${index + 1} of ${total}: ${title}`}
      className={`${cardBaseClass} ${direction === "prev" ? cardSlidePrevClass : cardSlideNextClass}`}
    >
      <div className={cardHeaderRowClass}>
        <h3 className={cardTitleClass}>{title}</h3>
        <span className={cardCounterClass}>
          {padIndex(index + 1)} / {padIndex(total)}
        </span>
      </div>

      <div className={cardImageRowClass}>
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous project"
          className={cardNavButtonClass}
        >
          &lsaquo;
        </button>

        <div className={cardImageFrameClass}>
          {resolvedVideoUrl ? (
            <video
              src={resolvedVideoUrl}
              autoPlay
              loop
              muted
              playsInline
              controls
              className={cardImageClass}
            />
          ) : resolvedImageUrl ? (
            <img
              src={resolvedImageUrl}
              alt={title}
              className={cardImageClass}
            />
          ) : (
            <span className={cardImagePlaceholderClass}>
              {padIndex(index + 1)}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onNext}
          aria-label="Next project"
          className={cardNavButtonClass}
        >
          &rsaquo;
        </button>
      </div>

      <div className={cardScrollBlockClass}>
        <p className={cardDescriptionClass}>
          {description}
        </p>

        <ul className={cardStackListClass}>
          {stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>

      <div className={cardLinkRowClass}>
        <CardLink href={liveUrl}>Live</CardLink>
        <CardLink href={repoUrl}>Repo</CardLink>
      </div>
    </div>
  );
}

export default ProjectCard;
