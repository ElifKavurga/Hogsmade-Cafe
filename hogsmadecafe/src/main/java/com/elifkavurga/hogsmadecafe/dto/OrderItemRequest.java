/**
 * @author Elif Kavurga
 */
package com.elifkavurga.hogsmadecafe.dto;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemRequest {

    private UUID menuItemId;
    private Integer quantity;
}
