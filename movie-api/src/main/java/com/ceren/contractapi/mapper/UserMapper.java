package com.ceren.contractapi.mapper;

import com.ceren.contractapi.model.User;
import com.ceren.contractapi.rest.dto.UserDto;

public interface UserMapper {

    UserDto toUserDto(User user);
}