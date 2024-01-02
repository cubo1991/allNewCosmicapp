import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AdaptText = async (text) => {

  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: `Adapt the following text to the context of the board game "Cosmic Encounters":\n\n${text}`,
      max_tokens: 60,
    }, {
      headers: {
        'Authorization': `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`,
        'Content-Type': 'application/json'
      }
    });

    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].text.trim();
    } else {
      throw new Error('No se pudo generar un texto adaptado');
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default AdaptText;

// Nueva función para adaptar las descripciones de los aliens
const adaptAlienDescriptions = async (aliens) => {
  const adaptedAliens = [];

  for (let alien of aliens) {
    if (alien.Descripcion) {
      const adaptedText = await AdaptText(alien.Descripcion);
      const adaptedAlien = { ...alien, Descripcion: adaptedText };
      adaptedAliens.push(adaptedAlien);
    } else {
      adaptedAliens.push(alien);
    }
  }

  return adaptedAliens;
};
