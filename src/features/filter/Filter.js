import React from "react";
import {
  titleFilterChanged,
  statusFilterChanged,
  sortMethodChanged,
  selectTitleFilter,
  selectStatusFilter,
  selectSortMethod,
} from "./filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "../../Components/TextInput";
import { FormLabel } from "react-bootstrap";
import styles from "../../styles/css/compiled/filter.module.css";

export function Filter() {
  const dispatch = useDispatch();

  const titleFilter = useSelector(selectTitleFilter);
  const statusFilter = useSelector(selectStatusFilter);
  const sortMethod = useSelector(selectSortMethod);

  const titleChangeAction = (e) => dispatch(titleFilterChanged(e.target.value));
  const statusChangeAction = (e) =>
    dispatch(statusFilterChanged(e.target.value));
  const sortMethodChangeAction = (e) =>
    dispatch(sortMethodChanged(e.target.value));

  return (
    <div className={styles.filterBar}>
      <section>
        <FormLabel htmlFor="order-by-date" children="sort by" />
        <select
          id="order-by-date"
          className="custom-select"
          value={sortMethod}
          onChange={(e) => sortMethodChangeAction(e)}
        >
          <option value="asc">new to old</option>
          <option value="desc">old to new</option>
        </select>
      </section>

      <section>
        <FormLabel htmlFor="filter-by-status" children="filter by status" />
        <select
          id="filter-by-status"
          className="custom-select"
          value={statusFilter}
          onChange={(e) => statusChangeAction(e)}
        >
          <option value="">-- select --</option>
          <option value="new">new</option>
          <option value="opened">opened</option>
          <option value="working on">working on</option>
          <option value="done">done</option>
        </select>
      </section>
      <section>
        <FormLabel htmlFor="filter-note-by-title" children="filter by title" />
        <TextInput
          id="filter-note-by-title"
          ph="filter notes by title"
          value={titleFilter}
          onChange={(e) => titleChangeAction(e)}
        />
      </section>
    </div>
  );
}
