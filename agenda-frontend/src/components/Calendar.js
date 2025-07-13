import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventForm from './EventForm';
import api from '../services/api';
import './calendar.css';


export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  const token = localStorage.getItem('token'); // Assumindo que você guarda o JWT aqui

  // Buscar eventos do usuário logado no backend
  useEffect(() => {
    if (!token) return;
    api.get('/events/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, [token]);

  // Abrir formulário ao clicar em uma data
  function handleDateClick(info) {
    setSelectedDate(info.dateStr);
    setEditingEvent(null);
    setShowForm(true);
  }

  // Abrir formulário para editar evento
  function handleEventClick(clickInfo) {
    setEditingEvent(clickInfo.event);
    setShowForm(true);
  }

  // Salvar evento (criar ou editar)
  function handleSave(eventData) {
    if (editingEvent) {
      // Editar
      api.put(`/events/${editingEvent.id}`, eventData, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          setEvents(events.map(ev => ev.id === editingEvent.id ? res.data : ev));
          setShowForm(false);
        })
        .catch(err => console.error(err));
    } else {
      // Criar
      api.post('/events', eventData, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          setEvents([...events, res.data]);
          setShowForm(false);
        })
        .catch(err => console.error(err));
    }
  }

  // Deletar evento
  function handleDelete(eventId) {
    api.delete(`/events/${eventId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        setEvents(events.filter(ev => ev.id !== eventId));
        setShowForm(false);
      })
      .catch(err => console.error(err));
  }

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        editable={false}
        selectable={true}
        height="auto"
      />

      {showForm && (
        <EventForm
          event={editingEvent}
          date={selectedDate}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
