import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateTrackName, addEffect, changeEffect, removeEffect } from 'src/actions';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Effects, EffectsName } from 'lib/effects';

const StyledTrackController = styled.div`
  ul.effect-list {
    margin: 0;
    padding: 0;
  }
`;

const mapStateToProps = ({ audioContext }) => {
  return { audioContext };
};

const mapDispatchToProps = {
  updateTrackName,
  addEffect,
  changeEffect,
  removeEffect,
};

function TrackController (props) {
  function onChangeTrackName (e) {
    props.updateTrackName(props.trackId, e.target.value);
  }

  function addEffect (eventKey) {
    const Effector = Effects[eventKey];
    props.addEffect(props.trackId, new Effector(props.audioContext));
  }

  function changeEffect (eventKey) {
    let [effectId, newEffectIndex] = eventKey.split(',');
    newEffectIndex = parseInt(newEffectIndex);
    const Effector = Effects[newEffectIndex];
    props.changeEffect(props.trackId, effectId, new Effector(props.audioContext));
  }

  function removeEffect (effectId) {
    props.removeEffect(props.trackId, effectId);
  }

  return (
    <StyledTrackController data-track-id={props.trackId}>
      <input type="text" value={props.trackName} onChange={onChangeTrackName} />
      <div>
        <label>Effects</label>
        <ul className="effect-list">
          {props.effects.map(effect => (
            <li key={effect.id}>
              <DropdownButton title={effect.id} drop="right" variant="secondary">
                <Dropdown.Item eventKey={effect.id} onSelect={removeEffect}>Unset</Dropdown.Item>
                {EffectsName.map((effectName, index) => (
                  <Dropdown.Item
                    key={index}
                    eventKey={`${effect.id},${index}`}
                    onSelect={changeEffect}>{effectName}</Dropdown.Item>
                ))}
              </DropdownButton>
            </li>
          ))}
          <li className="add-effect">
            <DropdownButton title="+" drop="right">
              {EffectsName.map((effectName, index) => (
                <Dropdown.Item key={index} eventKey={index} onSelect={addEffect}>{effectName}</Dropdown.Item>
              ))}
            </DropdownButton>
          </li>
        </ul>
      </div>
    </StyledTrackController>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackController);