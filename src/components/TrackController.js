import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateTrackName, addEffect, changeEffect, removeEffect } from 'src/actions';
import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { Effects, EffectsName } from 'lib/effects';

const StyledTrackController = styled.div`
  input[type="text"] {
    background-color: transparent;
    color: #ffffff;
    border: none;
  }
  div.effect-control {
    margin-top: 1rem;
    label {
      color: #bbbbbb;
      font-size: .8rem;
    }
    ul.effect-list {
      margin: 0;
      padding: 0;
      li {
        margin-bottom: .5rem;
        &:last-child {
          margin-bottom: 0;
        }
        .effect-box {
          width: 100%;
        }
        button {
          font-size: .8rem;
        }
      }
      .effect-option-button {
        flex: 1 1 100%;
      }
      .effect-change-button {
        flex: auto;
        width: auto;
      }
      .add-effect button {
        width: 100%;
        &::after {
          border: none;
        }
      }
    }
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
      <input type="text" defaultValue={props.trackName} onChange={onChangeTrackName} />
      <div className="effect-control">
        <label>Effects</label>
        <ul className="effect-list">
          {props.effects.map(effect => (
            <li key={effect.id}>
              <Dropdown drop="right" variant="secondary" as={ButtonGroup} className="effect-box">
                <Button variant="secondary" className="effect-option-button">{effect.name}</Button>
                <Dropdown.Toggle split variant="secondary" className="effect-change-button" />
                <Dropdown.Menu>
                  <Dropdown.Item eventKey={effect.id} onSelect={removeEffect}>Unset</Dropdown.Item>
                  {EffectsName.map((effectName, index) => (
                    <Dropdown.Item
                      key={index}
                      eventKey={`${effect.id},${index}`}
                      onSelect={changeEffect}>{effectName}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </li>
          ))}
          <li className="add-effect">
            <DropdownButton title="+" drop="right" variant="secondary">
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