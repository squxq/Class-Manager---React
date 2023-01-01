import styled from "styled-components"

const StyledWrapper = styled.div`
  .fc-toolbar-title,
  .fc-col-header-cell-cushion,
  .fc-daygrid-day-number {
    color: #f6f6f6;
    font-family: "Poppins";
    font-weight: 500;
  }

  .fc-prev-button,
  .fc-button,
  .fc-button-primary {
    background-color: rgb(58, 175, 169, 1);
    font-family: "Poppins";
  }
  .fc-prev-button:hover,
  .fc-button:hover,
  .fc-button-primary:hover {
    background-color: rgb(58, 175, 169, 0.7);
    font-family: "Poppins";
  }

  .fc-day-today {
    background-color: rgb(58, 175, 169, 0.4) !important;
    font-family: "Poppins";
  }

  .fc-timegrid-slot-label-cushion,
  .fc-scrollgrid-shrink-cushion {
    color: #f6f6f6;
    font-family: "Poppins";
  }

  .fc-col-header-cell-cushion {
    font-size: 1.25rem;
    font-family: "Poppins";
    font-weight: 500 !important;
  }

  .fc-button {
    font-size: 1.1rem;
    text-transform: capitalize;
    font-family: "Poppins";
  }

  .fc-more-link,
  .fc-event .fc-event-draggable,
  .fc-event-resizable,
  .fc-event-start,
  .fc-event-end,
  .fc-event-today,
  .fc-daygrid-event,
  .fc-daygrid-dot-event {
    color: #f6f6f6;
  }

  .fc-event-title {
    font-weight: 400;
  }

  .fc-timegrid-slot,
  .fc-timegrid-slot-lane {
    border-color: rgb(255, 255, 255, 0.3) !important;
    border-style: dashed !important;
  }
  /* For the event height */
  /* .fc-event {
    height: 100px !important;
  } */

  .fc-daygrid-day-number {
    cursor: default !important;
  }

  /* SCROLLBAR - START - */

  /* width */
  .fc-scroller::-webkit-scrollbar {
    width: 15px;
    border-bottom: 1px solid #f6f6f6 !important;
    border-left: 1px solid #f6f6f6 !important;
  }

  /* Track */
  .fc-scroller::-webkit-scrollbar-track {
    /* box-shadow: inset 0 0 5px grey; */
    border-bottom: 0 !important;
  }

  /* Handle */
  .fc-scroller::-webkit-scrollbar-thumb {
    background: #f6f6f6;
  }

  /* Handle on hover */
  .fc-scroller::-webkit-scrollbar-thumb:hover {
    background: rgb(255, 255, 255, 0.6);
  }

  .fc-scroller-liquid-absolute::-webkit-scrollbar {
    border-left: 1px solid #f6f6f6 !important;
    border-bottom: 0 !important;
  }

  .fc-col-header-cell-cushion {
    cursor: default;
  }

  /* SCROLLBAR - END - */
  margin: 2.5rem;
  background-color: #171923;
  position: relative;
`

export default StyledWrapper
