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

    event OnFarm(bytes32 indexed code, address indexed user, string metadata, uint256 timestamp);
    event InWarehouse(bytes32 indexed code, address indexed user, string metadata, uint256 timestamp);
    event InRetail(bytes32 indexed code, address indexed user, string metadata, uint256 timestamp);

    function GrowNYC() public {
    }

    function farm(bytes32 _code, string _metadata) public {
        emit OnFarm(_code, msg.sender, _metadata, block.timestamp);
    }
    
    function warehouse(bytes32 _code, string _metadata) public {
        emit InWarehouse(_code, msg.sender, _metadata, block.timestamp);
    }

    function retail(bytes32 _code, string _metadata) public {
        emit InRetail(_code, msg.sender, _metadata, block.timestamp);
    }
}