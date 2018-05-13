pragma solidity ^0.4.2;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/lifecycle/Pausable.sol";

/**
 * @title GrowNYC
 * Simple version of smart contract for tracking item from farm to retail
 * Can extend with list of farmer, warehouse and retails owner to restrict access
 *
 */
 
contract GrowNYC is Ownable, Pausable {

    event GrowNYCEvent(bytes32 indexed code, address indexed user, uint32 indexed order, string metadata, uint256 timestamp);
    
    function GrowNYC() public {
    }

    function farm(bytes32 _code, string _metadata) public {
        emit GrowNYCEvent(_code, msg.sender, 1, _metadata, block.timestamp);
    }
    
    function warehouse(bytes32 _code, string _metadata) public {
        emit GrowNYCEvent(_code, msg.sender, 2, _metadata, block.timestamp);
    }

    function retail(bytes32 _code, string _metadata) public {
        emit GrowNYCEvent(_code, msg.sender, 3, _metadata, block.timestamp);
    }
}