import React, { useState, useEffect } from 'react';

export default function EventForm({ event, date, onSave, onDelete, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.extendedProps?.description || '');
      setStartTime(event.start?.toISOString().slice(0,16) || '');
      setEndTime(event.end?.toISOString().slice(0,16) || '');
    } else if (date) {
      setStartTime(date + 'T09:00');
      setEndTime(date + 'T10:00');
    }
  }, [event, date]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title) {
      alert('Título é obrigatório');
      return;
    }

    onSave({
      title,
      description,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
    });
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{event ? 'Editar Evento' : 'Novo Evento'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />

          <label>Descrição:</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <label>Início:</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
            required
          />

          <label>Fim:</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
            required
          />

          <div className="buttons">
            <button type="submit">Salvar</button>
            {event && <button type="button" onClick={() => onDelete(event.id)}>Deletar</button>}
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
