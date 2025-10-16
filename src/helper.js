import StateWrapper from "./classes/StateWrapper.js";
import SmartWrapper from "./classes/SmartWrapper.js";
import AbortError from "./classes/AbortError.js";
import Toast from "./classes/Toast.js";

export const state = (value) => new StateWrapper(value);

export const wrap = (value) => new SmartWrapper(value);

export const toast = (opt = {}) => new Toast(opt);

export const abort = (message = "") => {
  toast().error(message);
  throw new AbortError(`=> ${message}`);
};

export const useTableDrag = (selectorOrElement, onReorder = null) => {
  const css = `
    tr.dragging td {
      opacity: 0.6;
      color: #ff8800 !important;
      background-color: rgba(255,136,0,.2) !important;
    }
    tr.sorted td {
      color: #043458 !important;
      background-color: rgba(4,52,88,.2) !important;
    }
  `;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const table =
    typeof selectorOrElement === "string"
      ? document.querySelector(selectorOrElement)
      : selectorOrElement;

  if (!table) {
    toast().warning("[useTableDrag] Таблицю не знайдено!");
    console.warn("[useTableDrag] Таблицю не знайдено:", selectorOrElement);
    return;
  }

  const tbody = table.querySelector("tbody");
  if (!tbody) {
    toast().warning("[useTableDrag] У таблиці немає <tbody>!");
    console.warn("[useTableDrag] У таблиці немає <tbody>:", selectorOrElement);
    return;
  }

  let draggedRow = null;

  tbody.querySelectorAll("tr").forEach((tr) => (tr.draggable = true));

  tbody.addEventListener("dragstart", (e) => {
    draggedRow = e.target.closest("tr");
    if (!draggedRow) return;
    e.dataTransfer.effectAllowed = "move";
    draggedRow.classList.add("dragging");
  });

  tbody.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
    e.target.classList.add("sorted");
  });

  tbody.addEventListener("dragover", (e) => {
    e.preventDefault();
    const targetRow = e.target.closest("tr");
    if (!targetRow || targetRow === draggedRow) return;

    const rect = targetRow.getBoundingClientRect();
    const next =
      e.clientY - rect.top > rect.height / 2
        ? targetRow.nextSibling
        : targetRow;
    tbody.insertBefore(draggedRow, next);
  });

  tbody.addEventListener("drop", (e) => {
    e.preventDefault();
    if (draggedRow) draggedRow.classList.remove("dragging");

    const newOrder = getOrder();
    if (typeof onReorder === "function") {
      onReorder(newOrder);
    }
  });

  const getOrder = () =>
    [...tbody.querySelectorAll("tr")].map((tr, index) => ({
      sort: index + 1,
      id: tr.dataset.id || tr.id || tr.innerText.trim(),
    }));

  return { getOrder };
};
